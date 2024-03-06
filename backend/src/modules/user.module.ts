import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';

import { UsersSchema } from 'src/models/users.model';

import { UserController } from 'src/controllers/user.controller';

import { AccessTokenStrategy } from 'src/guards/strategies/jwt-strategy';
import { RefreshTokenStrategy } from 'src/guards/strategies/refreshToken.strategy';
import { MailService } from 'src/services/mail.service';
import { MailModule } from './mail.module';
import { SubscriptionsSchema } from 'src/models/subscription.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Subscriptions', schema: SubscriptionsSchema },
    ]),
    JwtModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    MailService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
