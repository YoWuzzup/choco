import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { partialProductDto } from 'src/dtos/product.dto';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(@Query() query: partialProductDto) {
    return await this.productService.getProducts(query);
  }

  @Post()
  async createProduct(@Body() body: any) {
    return await this.productService.createProduct(body);
  }

  @Get(':id')
  async getOneProduct(@Param('id') _id: ObjectId | string) {
    const product = await this.productService.findOneProduct(_id);

    return product;
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post(':id/update')
  async updateProductInformation(
    @Param('id') _id: ObjectId | string,
    @Body() data: partialProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(_id, data);

    return updatedProduct;
  }
}
