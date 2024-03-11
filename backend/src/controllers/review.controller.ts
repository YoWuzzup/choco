import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { createReviewDto } from 'src/dtos/review.dto';
import { AccessTokenGuard } from 'src/guards/jwt-auth.guard';
import { ReviewService } from 'src/services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async createReview(@Body('reviewData') body: createReviewDto) {
    return await this.reviewService.createReview(body);
  }

  @Get()
  async getReviews(@Query() query: any) {
    return await this.reviewService.getReviews(query);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteReview(@Param('id') _id: ObjectId | string) {
    return await this.reviewService.deleteReview(_id);
  }
}
