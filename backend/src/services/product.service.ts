import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { productDto, partialProductDto } from 'src/dtos/product.dto';

import { Products } from 'src/models/products.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Products') private readonly productsModel: Model<Products>,
  ) {}

  async findOneProduct(_id: ObjectId | string): Promise<Products> | null {
    try {
      const product = await this.productsModel.findOne({ _id });

      return product.toObject();
    } catch (error) {
      throw error;
    }
  }

  async getProducts(query: any): Promise<Products[]> {
    const { sort, page, productsPerPage, ...data } = query;
    const skipAmount =
      page && productsPerPage ? (page - 1) * productsPerPage : 0;
    const nameRegex = new RegExp(data.name, 'i');

    const products: Products[] = await this.productsModel
      .find({ ...data, name: { $regex: nameRegex } })
      .sort(sort)
      .skip(skipAmount)
      .limit(productsPerPage || 0)
      .exec();

    return products;
  }

  async createProduct(payload: productDto): Promise<Products | Error> {
    try {
      const product = new this.productsModel({ ...payload });
      const result = await product.save();

      return result;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(_id: ObjectId | string, payload: partialProductDto) {
    try {
      return await this.productsModel
        .findOneAndUpdate({ _id }, payload, { new: true })
        .exec();
    } catch (error) {
      return error;
    }
  }

  async updateReview(_id: ObjectId | string, review: object) {
    try {
      const product = await this.productsModel.findById(_id);

      if (!product) throw new Error('Product not found!');

      const updatedReviews = [...product.reviews, review];

      return await this.productsModel
        .findOneAndUpdate({ _id }, { reviews: updatedReviews }, { new: true })
        .exec();
    } catch (error) {
      return error;
    }
  }
}
