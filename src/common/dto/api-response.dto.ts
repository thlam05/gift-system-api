export class SuccessResponse<T> {
  data: T;
  message: string;
}

export class PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message: string;
}

export class ErrorResponse {
  data: null;
  message: string;
  statusCode: number;
}
