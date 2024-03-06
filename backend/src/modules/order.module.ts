import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from 'src/controllers/order.controller';

import { OrdersSchema } from 'src/models/orders.model';
import { ProductsSchema } from 'src/models/products.model';
import { SubscriptionsSchema } from 'src/models/subscription.model';
import { UsersSchema } from 'src/models/users.model';
import { MailService } from 'src/services/mail.service';

import { OrderService } from 'src/services/order.service';
import { ProductService } from 'src/services/product.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Orders', schema: OrdersSchema },
      { name: 'Products', schema: ProductsSchema },
      { name: 'Users', schema: UsersSchema },
      { name: 'Subscriptions', schema: SubscriptionsSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    UserService,
    ProductService,
    JwtService,
    MailService,
  ],
  exports: [OrderService],
})
export class OrderModule {}
