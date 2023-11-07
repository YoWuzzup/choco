import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        // Define your custom logic to extract the token from different sources
        let token;

        // Try extracting from headers
        if (req.headers.authorization) {
          token = req.headers.authorization.replace('Bearer ', '');
        }

        // Try extracting from query parameters
        if (!token && req.query.access_token) {
          token = req.query.access_token;
        }

        // Try extracting from request body
        if (!token && req.body?.access_token) {
          token = req.body.access_token;
        }

        return token;
      },
      ignoreExpiration: true,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    console.log(`JwtStrategy validate payload: ${payload}`);
    console.log(`JwtStrategy validate payload: ${process.env.JWT_SECRET}`);
    return payload;
  }
}
