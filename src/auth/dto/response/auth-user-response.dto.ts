import { UserRole } from '../../entities/user.entity';

export class AuthUserResponseDto {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}