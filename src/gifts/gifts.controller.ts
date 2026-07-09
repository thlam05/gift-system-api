import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftsService } from './gifts.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

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
  findOneActive(@Param('id') id: string) {
    return this.giftsService.findOneActive(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('admin/gifts')
  create(@Body() dto: CreateGiftDto) {
    return this.giftsService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get('admin/gifts')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.giftsService.findAll(paginationDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get('admin/gifts/:id')
  findOne(@Param('id') id: string) {
    return this.giftsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch('admin/gifts/:id')
  update(@Param('id') id: string, @Body() dto: UpdateGiftDto) {
    return this.giftsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('admin/gifts/:id')
  remove(@Param('id') id: string) {
    return this.giftsService.remove(id);
  }
}
