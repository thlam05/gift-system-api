import { IsString, IsInt, Min, IsOptional, IsBoolean } from 'class-validator';

export class CreateGiftDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0)
  points: number;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
