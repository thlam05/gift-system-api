import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from './entities/gift.entity';
import { CreateGiftRequestDto } from './dto/request/create-gift-request.dto';
import { UpdateGiftRequestDto } from './dto/request/update-gift-request.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { GiftResponseDto } from './dto/response/gift-response.dto';
import { GIFT_MESSAGES } from '../common/constants/messages.constant';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private giftRepository: Repository<Gift>,
  ) {}

  async findAllActive(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<GiftResponseDto>> {
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 10;
    const [data, total] = await this.giftRepository.findAndCount({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: data.map((gift) => this.toResponseDto(gift)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOneActive(id: string): Promise<GiftResponseDto> {
    const gift = await this.giftRepository.findOne({
      where: { id, isActive: true },
    });
    if (!gift) {
      throw new NotFoundException(GIFT_MESSAGES.GIFT_NOT_FOUND);
    }
    return this.toResponseDto(gift);
  }

  async create(dto: CreateGiftRequestDto): Promise<GiftResponseDto> {
    const gift = this.giftRepository.create(dto);
    const savedGift = await this.giftRepository.save(gift);
    return this.toResponseDto(savedGift);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<GiftResponseDto>> {
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 10;
    const [data, total] = await this.giftRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: data.map((gift) => this.toResponseDto(gift)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string): Promise<GiftResponseDto> {
    const gift = await this.giftRepository.findOne({
      where: { id },
    });
    if (!gift) {
      throw new NotFoundException(GIFT_MESSAGES.GIFT_NOT_FOUND);
    }
    return this.toResponseDto(gift);
  }

  async update(
    id: string,
    requestDto: UpdateGiftRequestDto,
  ): Promise<GiftResponseDto> {
    const gift = await this.getGiftEntityOrThrow(id);
    Object.assign(gift, requestDto);
    const savedGift = await this.giftRepository.save(gift);
    return this.toResponseDto(savedGift);
  }

  async remove(id: string): Promise<void> {
    const gift = await this.getGiftEntityOrThrow(id);
    await this.giftRepository.remove(gift);
  }

  private async getGiftEntityOrThrow(id: string): Promise<Gift> {
    const gift = await this.giftRepository.findOne({
      where: { id },
    });
    if (!gift) {
      throw new NotFoundException(GIFT_MESSAGES.GIFT_NOT_FOUND);
    }

    return gift;
  }

  private toResponseDto(gift: Gift): GiftResponseDto {
    return {
      id: gift.id,
      name: gift.name,
      description: gift.description,
      points: gift.points,
      quantity: gift.quantity,
      isActive: gift.isActive,
      createdAt: gift.createdAt,
      updatedAt: gift.updatedAt,
    };
  }
}
