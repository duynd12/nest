import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      console.log('Line 19 : ', request.user);
      const { roles } = request.user;
      console.log('Line 20 : ', roles);
      return requiredRoles.includes(roles);
    }
    // const request = context.switchToHttp().getRequest();
    // console.log('Line 18 : ', request.user);
    // console.log('Line 17 : ', request);

    return false;
  }
}
