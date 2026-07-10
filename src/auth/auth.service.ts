import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import { RegisterRequestDto } from './dto/request/register-request.dto';
import { LoginRequestDto } from './dto/request/login-request.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';
import { AUTH_MESSAGES } from '../common/constants/messages.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterRequestDto): Promise<AuthResponseDto> {
    const existing = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException(AUTH_MESSAGES.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      fullName: dto.fullName,
      role: UserRole.USER,
    });
    await this.userRepository.save(user);

    return this.generateToken(user);
  }

  async login(dto: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    return this.generateToken(user);
  }

  async adminLogin(dto: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_ADMIN_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_ADMIN_CREDENTIALS);
    }

    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_ADMIN_CREDENTIALS);
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): AuthResponseDto {
    const payload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}
