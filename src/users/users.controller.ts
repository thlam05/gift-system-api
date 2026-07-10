import { Controller, Get, Patch, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
  ApiDataResponse,
  ApiPaginatedDataResponse,
} from '../common/decorators/api-data-response.decorator';
import { UsersService } from './users.service';
import { UpdateProfileRequestDto } from './dto/request/update-profile-request.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ChangePasswordRequestDto } from './dto/request/change-password-request.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UserRole } from '../auth/entities/user.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiTagsEnum } from '../common/constants/api-tags.constant';

@ApiTags(ApiTagsEnum.USERS)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiDataResponse(UserResponseDto)
  getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiDataResponse(UserResponseDto)
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileRequestDto,
  ) {
    return this.usersService.updateProfile(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('password')
  @ApiOperation({ summary: 'Change current user password' })
  @ApiDataResponse(UserResponseDto)
  @ApiBadRequestResponse({ description: 'Invalid old password or input data' })
  changePassword(
    @CurrentUser('id') userId: string,
    @Body() dto: ChangePasswordRequestDto,
  ) {
    return this.usersService.changePassword(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all users (Admin only, paginated)' })
  @ApiPaginatedDataResponse(UserResponseDto)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }
}
