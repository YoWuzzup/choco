import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/serveces/auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard() {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    try {
      const validatedUser = await this.authService.validateUser(
        email,
        password,
      );

      return validatedUser;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
