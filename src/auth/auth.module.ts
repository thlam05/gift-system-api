import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from './entities/user.entity';
import { CONFIG_MESSAGES } from '../common/constants/messages.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: (() => {
          const secret = configService.get<string>('jwt.secret');
          if (!secret) {
            throw new Error(CONFIG_MESSAGES.JWT_SECRET_NOT_CONFIGURED);
          }
          return secret;
        })(),
        signOptions: {
          expiresIn: (() => {
            const expiresIn = configService.get<string>('jwt.expiresIn');
            if (!expiresIn) {
              throw new Error(CONFIG_MESSAGES.JWT_EXPIRES_IN_NOT_CONFIGURED);
            }
            return expiresIn;
          })(),
        } as jwt.SignOptions,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthModule {}
