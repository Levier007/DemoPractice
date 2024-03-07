import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.header('Authorization') || '';
    const bearer = authorization.split(' ');
    const token = bearer[1].trim();
    const info = this.jwtService.verify(token);

    const permissions = this.reflector.get('permissions', context.getHandler());
    console.log(permissions);
    console.log(info.user.roles);
    const isOk = (permission) => {
      return permission.some((item) => item.name === permissions);
    };
    if (info.user.roles.some((item) => isOk(item.permissions))) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
