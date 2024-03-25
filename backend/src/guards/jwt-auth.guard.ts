import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RedirectException } from './exceptions/redirect.exception';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken =
      request.body.access_token || request.headers.authorization.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    const validatingAccessToken = await this.jwtService.verifyAsync(
      accessToken,
      {
        secret: `${this.configService.get('JWT_SECRET')}`,
      },
    );
    const isValid =
      (await validatingAccessToken?.response?.error) === 'Unauthorized'
        ? false
        : true;

    if (!isValid) {
      throw new RedirectException('/auth/refresh');
    }

    request.headers.authorization = `Bearer ${accessToken}`;

    return super.canActivate(context) as Promise<boolean>;
  }
}
