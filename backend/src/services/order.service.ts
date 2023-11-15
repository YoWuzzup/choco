import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Orders } from 'src/models/orders.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders') private readonly ordersModel: Model<Orders>,
  ) {}
}
