import { UserRole } from '../../../auth/entities/user.entity';

export class UserResponseDto {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}