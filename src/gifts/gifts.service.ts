import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from './entities/gift.entity';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private giftRepository: Repository<Gift>,
  ) {}

  async findAllActive(paginationDto: PaginationDto): Promise<PaginatedResult<Gift>> {
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 10;
    const [data, total] = await this.giftRepository.findAndCount({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOneActive(id: string) {
    const gift = await this.giftRepository.findOne({
      where: { id, isActive: true },
    });
    if (!gift) {
      throw new NotFoundException('Gift not found');
    }
    return gift;
  }

  async create(dto: CreateGiftDto) {
    const gift = this.giftRepository.create(dto);
    return this.giftRepository.save(gift);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Gift>> {
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 10;
    const [data, total] = await this.giftRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const gift = await this.giftRepository.findOne({
      where: { id },
    });
    if (!gift) {
      throw new NotFoundException('Gift not found');
    }
    return gift;
  }

  async update(id: string, dto: UpdateGiftDto) {
    const gift = await this.findOne(id);
    Object.assign(gift, dto);
    return this.giftRepository.save(gift);
  }

  async remove(id: string) {
    const gift = await this.findOne(id);
    await this.giftRepository.remove(gift);
    return null;
  }
}
