import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGES } from '../constants/messages.constant';

@Injectable()
export class ResponseInterceptor implements NestInterceptor<unknown, unknown> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        if (
          data &&
          typeof data === 'object' &&
          'data' in data &&
          'meta' in data
        ) {
          return {
            data: (data as { data: unknown }).data,
            meta: (data as { meta: unknown }).meta,
            message: RESPONSE_MESSAGES.SUCCESS,
          };
        }

        return {
          data: data ?? null,
          message: RESPONSE_MESSAGES.SUCCESS,
        };
      }),
    );
  }
}
