export class GiftResponseDto {
  id: string;
  name: string;
  description: string | null;
  points: number;
  quantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
