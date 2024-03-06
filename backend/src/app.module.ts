import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from 'src/modules/auth.module';
import { ProductModule } from './modules/product.module';
import { OrderModule } from './modules/order.module';

import { AuthService } from './services/auth.service';

import { UsersSchema } from './models/users.model';

import { RolesGuard } from './guards/roles.guard';
import { MailModule } from './modules/mail.module';
import { MailService } from './services/mail.service';
import { UserService } from './services/user.service';
import { SubscriptionsSchema } from './models/subscription.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Subscriptions', schema: SubscriptionsSchema },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt', global: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get('MONGODB_URI')}`,
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: `${configService.get('JWT_SECRET')}`,
        signOptions: { expiresIn: `${configService.get('JWT_EXPIRESIN')}` },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProductModule,
    OrderModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RolesGuard,
    AuthService,
    JwtService,
    MailService,
    UserService,
  ],
})
export class AppModule {}
