import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

import { MailService } from 'src/services/mail.service';
import { MailController } from 'src/controllers/mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          secure: false,
          service: 'Gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.MAILER_GOOGLE_USER,
            pass: process.env.MAILER_GOOGLE_PASS,
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com',
        },
        template: {
          dir: path.resolve(__dirname, '..', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: false },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
