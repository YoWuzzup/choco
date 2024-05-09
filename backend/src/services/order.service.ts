import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Orders } from 'src/models/orders.model';
import { Products } from 'src/models/products.model';
import { Users } from 'src/models/users.model';

import { UserService } from './user.service';
import { ProductService } from './product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders') private readonly ordersModel: Model<Orders>,
    @InjectModel('Products') private readonly productsModel: Model<Products>,
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async getOrders(query: any): Promise<any[]> {
    const orders = await this.ordersModel
      .find({ ...query })
      .lean()
      .exec();

    // replace order items ids with actual objects
    const newOrdersPromises = orders.map(async (o) => {
      const ids = o.items.map((i) => {
        if (typeof i === 'string') return i.split('?')[0];

        return i.toString();
      });

      const productData = await this.productService.getProducts({
        _id: ids,
        sort: { age: 1 },
      });

      return { ...o, items: productData };
    });

    // wait for all promises to resolve
    const newOrders = await Promise.all(newOrdersPromises);

    return newOrders;
  }

  async createOrder(payload: {
    items: ObjectId[] | string[];
    additionalInfo?: any;
    contacts?: {
      city?: string;
      lineOne?: string;
      phoneNumber?: string;
      zip?: string;
      email: string;
      userId: ObjectId | string;
    };
    date: Date;
  }): Promise<any> {
    try {
      // creating new order
      const newOrder = new this.ordersModel({
        ...payload,
      });

      // updating user
      const { orders } = await this.userService.findOneUser({
        _id: payload.contacts.userId,
        email: payload.contacts.email,
      });
      await this.userService.updateUser(
        {
          _id: payload.contacts.userId,
        },
        { orders: [...orders, newOrder._id], cart: [] },
      );

      return await newOrder.save();
    } catch (error) {
      return error;
    }
  }

  async deleteOrder(
    orderId: ObjectId | string,
    query: { userId: ObjectId | string },
  ) {
    try {
      const { orders } = await this.userService.findOneUser({
        _id: query.userId,
      });
      // updating user
      const filteredOrders = orders.filter((o: Orders) => o._id !== orderId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { tokens, password, ...user } = (
        await this.userService.updateUser(
          { _id: query.userId },
          { orders: filteredOrders },
        )
      ).toObject();

      // deleting order model
      await this.ordersModel.deleteOne({ _id: orderId });

      return user;
    } catch (error) {
      return error;
    }
  }
}
