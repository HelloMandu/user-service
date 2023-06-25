import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T> {
  private readonly logger = new Logger();
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    this.logger.debug('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.logger.debug(`After... ${Date.now() - now}ms`)));
  }
}
