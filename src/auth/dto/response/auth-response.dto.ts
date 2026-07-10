import { AuthUserResponseDto } from './auth-user-response.dto';

export class AuthResponseDto {
  accessToken: string;
  user: AuthUserResponseDto;
}
