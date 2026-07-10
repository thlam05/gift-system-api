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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiNoContentResponse, ApiNotFoundResponse, ApiParam, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiDataResponse, ApiCreatedDataResponse, ApiPaginatedDataResponse } from '../common/decorators/api-data-response.decorator';
import { GiftsService } from './gifts.service';
import { CreateGiftRequestDto } from './dto/request/create-gift-request.dto';
import { UpdateGiftRequestDto } from './dto/request/update-gift-request.dto';
import { GiftResponseDto } from './dto/response/gift-response.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UserRole } from '../auth/entities/user.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiTagsEnum } from '../common/constants/api-tags.constant';

@ApiTags(ApiTagsEnum.GIFTS)
@ApiBearerAuth()
@Controller()
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('gifts')
  @ApiOperation({ summary: 'Get active gifts (paginated)' })
  @ApiPaginatedDataResponse(GiftResponseDto)
  findAllActive(@Query() paginationDto: PaginationDto) {
    return this.giftsService.findAllActive(paginationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('gifts/:id')
  @ApiOperation({ summary: 'Get an active gift by ID' })
  @ApiParam({ name: 'id', description: 'Gift UUID' })
  @ApiDataResponse(GiftResponseDto)
  @ApiNotFoundResponse({ description: 'Gift not found' })
  findOneActive(@Param('id', ParseUUIDPipe) id: string) {
    return this.giftsService.findOneActive(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin/gifts')
  @ApiOperation({ summary: 'Create a new gift (Admin only)' })
  @ApiCreatedDataResponse(GiftResponseDto)
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() dto: CreateGiftRequestDto) {
    return this.giftsService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/gifts')
  @ApiOperation({ summary: 'Get all gifts (Admin only, paginated)' })
  @ApiPaginatedDataResponse(GiftResponseDto)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.giftsService.findAll(paginationDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/gifts/:id')
  @ApiOperation({ summary: 'Get any gift by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'Gift UUID' })
  @ApiDataResponse(GiftResponseDto)
  @ApiNotFoundResponse({ description: 'Gift not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.giftsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/gifts/:id')
  @ApiOperation({ summary: 'Update a gift (Admin only)' })
  @ApiParam({ name: 'id', description: 'Gift UUID' })
  @ApiDataResponse(GiftResponseDto)
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Gift not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateGiftRequestDto) {
    return this.giftsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  @Delete('admin/gifts/:id')
  @ApiOperation({ summary: 'Delete a gift (Admin only)' })
  @ApiParam({ name: 'id', description: 'Gift UUID' })
  @ApiNoContentResponse({ description: 'Gift deleted' })
  @ApiNotFoundResponse({ description: 'Gift not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.giftsService.remove(id);
  }
}
