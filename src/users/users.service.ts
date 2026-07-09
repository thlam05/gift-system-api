import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...result } = user;
    return result;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, dto);
    await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...result } = user;
    return result;
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<User>> {
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 10;
    const [data, total] = await this.userRepository.findAndCount({
      select: [
        'id',
        'email',
        'fullName',
        'phone',
        'role',
        'createdAt',
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
