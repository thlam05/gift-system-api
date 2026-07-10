import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGES } from '../constants/messages.constant';
import { SuccessResponse, PaginatedResponse } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
          const res: PaginatedResponse<any> = {
            data: data.data,
            meta: data.meta,
            message: RESPONSE_MESSAGES.SUCCESS,
          };
          return res;
        }

        const res: SuccessResponse<any> = {
          data: data ?? null,
          message: RESPONSE_MESSAGES.SUCCESS,
        };
        return res;
      }),
    );
  }
}
