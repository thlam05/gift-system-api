import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/database.config';
import envConfig from './config/env.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default('postgres'),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().default('gift_system'),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().pattern(/^\d+(s|m|h|d|w|y)?$/i).required(),
      }),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    GiftsModule,
  ],
})

export class AppModule { }