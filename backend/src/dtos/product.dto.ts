import { PartialType } from '@nestjs/mapped-types';

export class productDto {
  name: string;
  price: number;
  description: string;
}

export class partialProductDto extends PartialType(productDto) {}
