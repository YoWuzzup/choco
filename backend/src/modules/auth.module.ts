import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { UsersSchema } from 'src/models/users.model';
import { UserService } from 'src/services/user.service';

import { AccessTokenStrategy } from 'src/guards/strategies/jwt-strategy';
import { LocalStrategy } from 'src/guards/strategies/local-strategy';
import { RefreshTokenStrategy } from 'src/guards/strategies/refreshToken.strategy';
import { RedirectFilter } from 'src/guards/filters/redirect.filter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get('JWT_EXPIRESIN')}` },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    {
      provide: APP_FILTER,
      useClass: RedirectFilter,
    },
  ],
})
export class AuthModule {}
