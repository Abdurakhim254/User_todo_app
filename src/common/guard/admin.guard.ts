import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const req = request.user;

    return req?.role===UserRoles.ADMIN
  }
}
