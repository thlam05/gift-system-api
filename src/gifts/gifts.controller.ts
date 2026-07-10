import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  HttpCode,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftsService } from './gifts.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UserRole } from '../auth/entities/user.entity';

@Controller()
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('gifts')
  findAllActive(@Query() paginationDto: PaginationDto) {
    return this.giftsService.findAllActive(paginationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('gifts/:id')
  findOneActive(@Param('id', ParseUUIDPipe) id: string) {
    return this.giftsService.findOneActive(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Post('admin/gifts')
  create(@Body() dto: CreateGiftDto) {
    return this.giftsService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Get('admin/gifts')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.giftsService.findAll(paginationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Get('admin/gifts/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.giftsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Patch('admin/gifts/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateGiftDto) {
    return this.giftsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  @Delete('admin/gifts/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.giftsService.remove(id);
  }
}
