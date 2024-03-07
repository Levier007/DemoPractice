import { UserService } from '../modules/user/user.service';
import { RedisService } from '../modules/redis/redis.service';
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

  @Inject(RedisService)
  private redisService: RedisService;

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

    let permissions = await this.redisService.listGet(
      `user_${info.user.username}_permissions`,
    );

    if (permissions.length === 0) {
      const foundUserRoles = await this.userService.findByUsername(
        info.user.username,
      );
      const foundRolesPermissions = await this.userService.findByRole(
        foundUserRoles.roles.map((item) => item.id),
      );

      let permissionsArr = foundRolesPermissions.map(
        (role) => role.permissions,
      );
      permissions = [
        ...new Set(
          [].concat(
            ...permissionsArr.map((item) => {
              let res = item.map((el) => el.name);
              return res;
            }),
          ),
        ),
      ];

      this.redisService.listSet(
        `user_${info.user.username}_permissions`,
        permissions,
        60 * 30,
      );
    }

    const permission = this.reflector.get('permissions', context.getHandler());
    if (permissions.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
