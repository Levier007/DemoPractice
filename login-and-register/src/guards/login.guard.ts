import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
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
export class LoginGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (request.url.includes('/login') || request.url.includes('/register')) {
      return true;
    }
    const authorization = request.header('Authorization') || '';
    const bearer = authorization.split(' ');
    console.log(this.userService);
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录token错误');
    }
    const token = bearer[1].trim();
    try {
      const info = this.jwtService.verify(token);

      (request as any).user = info.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
