import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBadRequestResponse, ApiConflictResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiDataResponse, ApiCreatedDataResponse } from '../common/decorators/api-data-response.decorator';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/request/register-request.dto';
import { LoginRequestDto } from './dto/request/login-request.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';
import { AUTH_MESSAGES } from '../common/constants/messages.constant';
import { ApiTagsEnum } from '../common/constants/api-tags.constant';

@ApiTags(ApiTagsEnum.AUTH)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedDataResponse(AuthResponseDto)
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiConflictResponse({ description: AUTH_MESSAGES.EMAIL_EXISTS })
  register(@Body() dto: RegisterRequestDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiDataResponse(AuthResponseDto)
  @ApiBadRequestResponse({ description: AUTH_MESSAGES.INVALID_CREDENTIALS })
  login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login with email and password' })
  @ApiDataResponse(AuthResponseDto)
  @ApiBadRequestResponse({ description: AUTH_MESSAGES.INVALID_ADMIN_CREDENTIALS })
  adminLogin(@Body() dto: LoginRequestDto) {
    return this.authService.adminLogin(dto);
  }
}
