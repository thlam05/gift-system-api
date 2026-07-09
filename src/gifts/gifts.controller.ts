import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftsService } from './gifts.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller()
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('api/gifts')
  findAllActive() {
    return this.giftsService.findAllActive();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/gifts/:id')
  findOneActive(@Param('id') id: string) {
    return this.giftsService.findOneActive(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('api/admin/gifts')
  create(@Body() dto: CreateGiftDto) {
    return this.giftsService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get('api/admin/gifts')
  findAll() {
    return this.giftsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get('api/admin/gifts/:id')
  findOne(@Param('id') id: string) {
    return this.giftsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch('api/admin/gifts/:id')
  update(@Param('id') id: string, @Body() dto: UpdateGiftDto) {
    return this.giftsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('api/admin/gifts/:id')
  remove(@Param('id') id: string) {
    return this.giftsService.remove(id);
  }
}
