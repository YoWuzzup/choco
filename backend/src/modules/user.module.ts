import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { UsersSchema } from 'src/models/users.model';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { AuthModule } from './auth.module';

import { AccessTokenStrategy } from 'src/guards/strategies/jwt-strategy';
import { RefreshTokenStrategy } from 'src/guards/strategies/refreshToken.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class UserModule {}
