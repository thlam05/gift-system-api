import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiCreatedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiDataResponse = (model: Type<unknown>) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          data: { $ref: getSchemaPath(model) },
          message: { type: 'string', example: 'Success' },
        },
      },
    }),
  );
};

export const ApiCreatedDataResponse = (model: Type<unknown>) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiCreatedResponse({
      schema: {
        type: 'object',
        properties: {
          data: { $ref: getSchemaPath(model) },
          message: { type: 'string', example: 'Success' },
        },
      },
    }),
  );
};

export const ApiPaginatedDataResponse = (model: Type<unknown>) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
          meta: {
            type: 'object',
            properties: {
              page: { type: 'number' },
              limit: { type: 'number' },
              total: { type: 'number' },
              totalPages: { type: 'number' },
            },
          },
          message: { type: 'string', example: 'Success' },
        },
      },
    }),
  );
};
