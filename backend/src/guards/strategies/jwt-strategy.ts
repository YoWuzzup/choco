import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { RedirectException } from '../exceptions/redirect.exception';

export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...data } = payload;
    const validatedAccessToken: boolean = await this.validateToken(exp);

    // if token is invalid - redirect
    if (!validatedAccessToken) {
      throw new RedirectException('/auth/refresh');
    }

    return payload;
  }

  async validateToken(exp: number): Promise<boolean> {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return exp >= currentTimestamp;
  }
}
