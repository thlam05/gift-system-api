import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiCreatedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiDataResponse = <TModel extends Type<any>>(model: TModel) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiCreatedDataResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiPaginatedDataResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
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
