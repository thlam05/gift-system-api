import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from './entities/gift.entity';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private giftRepository: Repository<Gift>,
  ) {}

  async findAllActive() {
    return this.giftRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
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

  async findAll() {
    return this.giftRepository.find({
      order: { createdAt: 'DESC' },
    });
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
    return { message: 'Gift deleted successfully' };
  }
}
