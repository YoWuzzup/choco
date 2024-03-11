import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { partialOrderDto } from 'src/dtos/order.dto';
import { AccessTokenGuard } from 'src/guards/jwt-auth.guard';
import { OrderService } from 'src/services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(@Query() query: partialOrderDto) {
    return await this.orderService.getOrders(query);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async createOrder(@Body() body: any) {
    return await this.orderService.createOrder(body);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteOrder(
    @Param('id') orderId: ObjectId | string,
    @Query() query: { userId: ObjectId | string },
  ) {
    return await this.orderService.deleteOrder(orderId, query);
  }
}
