import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { RedirectException } from '../exceptions/redirect.exception';

export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractRefreshJWTFromBody,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  private static extractRefreshJWTFromBody(req: Request): string | null {
    if (req.body && req.body.access_token) {
      return req.body.access_token;
    }
    return null;
  }

  async validate(req: Request, payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...data } = payload;

    try {
      const validatedAccessToken: boolean = await this.validateToken(exp);

      // if token is invalid - redirect
      if (!validatedAccessToken) {
        throw new RedirectException('/auth/refresh');
      }

      return payload;
    } catch (error) {
      return error;
    }
  }

  async validateToken(exp: number): Promise<boolean> {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return exp >= currentTimestamp;
  }
}
