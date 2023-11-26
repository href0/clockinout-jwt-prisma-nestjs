import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from '@nestjs/core'


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector : Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(), 
      context.getClass()])
    const request = context.switchToHttp().getRequest();
    console.log('user role', request.user.role)
    console.log('allowed role', role)
    return true;
  }
}
