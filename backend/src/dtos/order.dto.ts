import { PartialType } from '@nestjs/mapped-types';
import { ObjectId, Types } from 'mongoose';

import { ProductsSchema } from 'src/models/products.model';

export class orderDto {
  buyer: ObjectId;
  products: Types.DocumentArray<typeof ProductsSchema>;
  date: Date;
}

export class partialOrderDto extends PartialType(orderDto) {}
