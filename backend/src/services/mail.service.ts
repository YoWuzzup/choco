import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/models/users.model';
import { Subscriptions } from 'src/models/subscription.model';

@Injectable()
export class MailService {
  constructor(
    @InjectModel('Users') private usersModel: Model<Users>,
    @InjectModel('Subscriptions')
    private subscriptionsModel: Model<Subscriptions>,
    private mailerService: MailerService,
  ) {}

  async sendEmail(
    templateData: any,
    templateName: string,
    recieverEmail: string,
  ) {
    await this.mailerService.sendMail({
      from: process.env.MAILER_GOOGLE_USER,
      to: recieverEmail,
      subject: `New message from ${process.env.MAILER_GOOGLE_USER}`,
      template: `../templates/${templateName}`,
      context: { ...templateData },
    });
  }

  async confirmEmail(id: ObjectId | string) {
    const user = await this.usersModel.findOneAndUpdate(
      { _id: id },
      { emailVerified: true },
    );
    const { emailVerified } = user;

    return { emailVerified };
  }

  async subscribeToNews(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (email.trim() === '' || !emailRegex.test(email)) {
      throw new BadRequestException('Invalid email provided');
    }

    // make a subscription
    await this.subscriptionsModel.create({ email, news: true });

    throw new HttpException('Subscribed!', HttpStatus.OK);
  }
}
