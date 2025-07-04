import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const [type, token] = request.headers.authorization?.split(' ') || [];

    
    if (type !== 'Bearer' || !token) {
      return false;
    }

    try {
      const decoded = await this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
            
      request.user = decoded;
      return true;
    } catch (error) {
            return false;
    }
  }
}
