import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../role';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    console.log('角色是', requiredRoles);

    // 获取请求头信息
    const token = request.headers.authorization;
    if (token?.trim()) {
      return true;
    } else {
      return false;
    }
  }
}
