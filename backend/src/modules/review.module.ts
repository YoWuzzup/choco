import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from 'src/controllers/review.controller';
import { ReviewsSchema } from 'src/models/reviews.model';
import { AuthService } from 'src/services/auth.service';
import { MailService } from 'src/services/mail.service';
import { ReviewService } from 'src/services/review.service';
import { UserService } from 'src/services/user.service';
import { UsersSchema } from 'src/models/users.model';
import { SubscriptionsSchema } from 'src/models/subscription.model';
import { ProductService } from 'src/services/product.service';
import { ProductsSchema } from 'src/models/products.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reviews', schema: ReviewsSchema },
      { name: 'Users', schema: UsersSchema },
      { name: 'Subscriptions', schema: SubscriptionsSchema },
      { name: 'Products', schema: ProductsSchema },
    ]),
  ],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    AuthService,
    JwtService,
    UserService,
    MailService,
    ProductService,
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
