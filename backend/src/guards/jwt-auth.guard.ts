import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RedirectException } from './exceptions/redirect.exception';

import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken =
      request.body.access_token || request.headers.authorization.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    const validatingAccessToken =
      await this.authService.validateJwtToken(accessToken);
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
