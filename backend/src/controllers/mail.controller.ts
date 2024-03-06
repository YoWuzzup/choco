import { Body, Controller, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { MailService } from 'src/services/mail.service';

@Controller('email')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('subscribetonews')
  async subscribeToNews(@Body() body: { email: string }) {
    return this.mailService.subscribeToNews(body.email);
  }

  @Post('confirm/:id')
  async confirmEmail(@Param('id') _id: ObjectId | string) {
    return this.mailService.confirmEmail(_id);
  }
}
