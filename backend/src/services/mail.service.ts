import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(
    templateData: any,
    recieverEmail: string,
    templateFilePath: string,
  ) {
    await this.mailerService.sendMail({
      from: process.env.MAILER_GOOGLE_USER,
      to: recieverEmail,
      subject: `New message from ${process.env.MAIL_USER}`,
      template: templateFilePath,
      context: { ...templateData },
    });
  }
}
