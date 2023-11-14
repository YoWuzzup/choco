import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from 'src/controllers/product.controller';
import { ProductsSchema } from 'src/models/products.model';
import { UsersSchema } from 'src/models/users.model';
import { AuthService } from 'src/services/auth.service';
import { ProductService } from 'src/services/product.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Products', schema: ProductsSchema },
      { name: 'Users', schema: UsersSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, AuthService, JwtService, UserService],
  exports: [ProductService],
})
export class ProductModule {}
