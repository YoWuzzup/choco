import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractRefreshJWTFromCookie,
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: `${process.env.jwt_secret}`,
    });
  }

  private static extractRefreshJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.refresh_token) {
      return req.cookies.refresh_token;
    }
    return null;
  }

  async validate(req: Request, payload: any) {
    return payload;
  }
}
