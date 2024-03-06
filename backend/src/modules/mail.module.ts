import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

import { MailService } from 'src/services/mail.service';
import { MailController } from 'src/controllers/mail.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/models/users.model';
import { SubscriptionsSchema } from 'src/models/subscription.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Subscriptions', schema: SubscriptionsSchema },
    ]),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          secure: false,
          service: 'Gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: configService.get(`MAILER_GOOGLE_USER`),
            pass: configService.get(`MAILER_GOOGLE_PASS`),
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
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService, JwtService],
  exports: [MailService],
})
export class MailModule {}
