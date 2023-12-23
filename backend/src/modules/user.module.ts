import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';

import { UsersSchema } from 'src/models/users.model';

import { UserController } from 'src/controllers/user.controller';

import { AccessTokenStrategy } from 'src/guards/strategies/jwt-strategy';
import { RefreshTokenStrategy } from 'src/guards/strategies/refreshToken.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
