export class SuccessResponse {
  data: unknown;
  message: string;
}

export class PaginatedResponse {
  data: unknown[];
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
