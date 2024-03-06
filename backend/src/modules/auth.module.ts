import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { UsersSchema } from 'src/models/users.model';

import { AccessTokenStrategy } from 'src/guards/strategies/jwt-strategy';
import { LocalStrategy } from 'src/guards/strategies/local-strategy';
import { RefreshTokenStrategy } from 'src/guards/strategies/refreshToken.strategy';
import { RedirectFilter } from 'src/guards/filters/redirect.filter';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail.module';
import { MailService } from 'src/services/mail.service';
import { UserService } from 'src/services/user.service';
import { SubscriptionsSchema } from 'src/models/subscription.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Subscriptions', schema: SubscriptionsSchema },
    ]),
    UserModule,
    JwtModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UserService,
    LocalStrategy,
    {
      provide: APP_FILTER,
      useClass: RedirectFilter,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
