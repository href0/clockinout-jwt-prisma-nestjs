import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from '@nestjs/core'


@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger('RoleDenied');
  constructor(private reflector : Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(), 
      context.getClass()])
    const request = context.switchToHttp().getRequest();
    if(!role.includes(request.user.role)){
      const message = `${request.method} ${request.originalUrl} `;
      this.logger.error(message)
      return false
    }
    return true;
  }
}
