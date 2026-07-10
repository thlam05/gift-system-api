import { Controller, Get, Patch, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateProfileRequestDto } from './dto/request/update-profile-request.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ChangePasswordRequestDto } from './dto/request/change-password-request.dto';
import { UserRole } from '../auth/entities/user.entity';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileRequestDto,
  ) {
    return this.usersService.updateProfile(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('password')
  changePassword(
    @CurrentUser('id') userId: string,
    @Body() dto: ChangePasswordRequestDto,
  ) {
    return this.usersService.changePassword(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }
}
