import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [RolesGuard],
  exports: [RolesGuard],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CommonModule {}
