import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../role';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.header('Authorization') || '';

    const bearer = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录 token 错误');
    }

    const token = bearer[1].trim();
    console.log(token);

    try {
      const info = this.jwtService.verify(token);
      (request as any).user = info.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
