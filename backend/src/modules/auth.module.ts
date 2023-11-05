import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from 'src/controllers/auth.controller';
import { UsersSchema } from 'src/models/users.model';
import { AuthService } from 'src/serveces/auth.service';
import { UserService } from 'src/serveces/user.service';

import { JwtStrategy } from 'src/strategies/jwt-strategy';
import { LocalStrategy } from 'src/strategies/local-strategy';
import { RefreshJwtStrategy } from 'src/strategies/refreshToken.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    ConfigModule,
    PassportModule.register({}),
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
    JwtStrategy,
    LocalStrategy,
    RefreshJwtStrategy,
  ],
})
export class AuthModule {}
