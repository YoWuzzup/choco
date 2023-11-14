import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) return true; // If no roles are specified, allow access

    const request = context.switchToHttp().getRequest();
    const data = request.body;

    const validatingAccessToken = await this.authService.validateJwtToken(
      data.access_token,
    );
    const userHasRolesInJWT = await validatingAccessToken.roles?.some(
      (role: string) => roles.includes(role),
    );

    const userHasRolesInBody = data.roles.some((role: string) =>
      roles.includes(role),
    );

    return userHasRolesInJWT || userHasRolesInBody ? true : false;
  }
}
