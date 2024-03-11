import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Reviews } from 'src/models/reviews.model';
import { createReviewDto } from 'src/dtos/review.dto';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { Users } from 'src/models/users.model';
import { Products } from 'src/models/products.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Users') private usersModel: Model<Users>,
    @InjectModel('Reviews') private reviewsModel: Model<Reviews>,
    @InjectModel('Products') private readonly productsModel: Model<Products>,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async createReview(body: createReviewDto) {
    const { productId, ...dataToSave } = body;
    const newReview = new this.reviewsModel({ ...dataToSave });
    const result = await newReview.save();

    // update user with new review
    const user = await this.userService.findOneUser({ _id: body.userId });
    const updatedUserReviews = [...user.reviews, result._id];
    await this.userService.updateUser(
      { _id: body.userId },
      { reviews: updatedUserReviews },
    );

    // update product with new review
    const product = await this.productService.findOneProduct(productId);
    const updatedProductReviews = [...product.reviews, result._id];
    const productToSend = await this.productService.updateProduct(productId, {
      reviews: updatedProductReviews,
    });

    return productToSend;
  }

  async getReviews(body: any) {
    const filter = {};
    const finalFilter = { ...filter, ...body };

    const reviews = await this.reviewsModel.find(finalFilter).limit(25).exec();

    return reviews;
  }

  async deleteReview(_id: string | ObjectId) {
    const deletedReview = await this.reviewsModel.findOneAndRemove({ _id });

    if (!deletedReview) throw new BadRequestException('Review is deleted!');
    const objectToSend: { productReviews: string[]; userReviews: string[] } = {
      productReviews: [],
      userReviews: [],
    };

    const user = await this.usersModel.findOne({
      reviews: { $in: [deletedReview._id] },
    });

    if (user) {
      const updatedUserReviews = user.reviews.filter(
        (rId) => rId.toString() !== deletedReview._id.toString(),
      );
      objectToSend.userReviews = updatedUserReviews;

      await this.userService.updateUser(
        { _id: user._id },
        { reviews: updatedUserReviews },
      );
    }

    // update product with new review
    const product = await this.productsModel.findOne({
      reviews: { $in: [deletedReview._id] },
    });

    if (product) {
      const updatedProductReviews = product.reviews.filter(
        (rId) => rId.toString() !== deletedReview._id.toString(),
      );
      objectToSend.productReviews = updatedProductReviews;

      await this.productService.updateProduct(product._id, {
        reviews: updatedProductReviews,
      });
    }

    return objectToSend;
  }
}
