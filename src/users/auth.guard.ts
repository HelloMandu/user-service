import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    return !!this.authService.verify(token);
  }
}
