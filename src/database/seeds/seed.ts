import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../config/database.config';
import * as bcrypt from 'bcrypt';

const logger = new Logger('Seed');

async function seed() {
  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();
  logger.log('Database connected');

  const queryRunner = dataSource.createQueryRunner();

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await queryRunner.query(
    `INSERT INTO "users" ("email", "password", "full_name", "role")
     VALUES ('admin@gift.com', $1, 'Admin', 'admin')
     ON CONFLICT ("email") DO NOTHING`,
    [hashedPassword],
  );

  logger.log('Admin user created');

  await queryRunner.query(
    `INSERT INTO "gifts" ("name", "description", "points", "quantity")
     VALUES
       ('Gift Card 50K', 'Gift card trị giá 50.000 VND', 100, 50),
       ('Gift Card 100K', 'Gift card trị giá 100.000 VND', 200, 30),
       ('Voucher Shopee 20K', 'Voucher giảm giá 20.000 VND trên Shopee', 40, 100),
       ('Sổ tay cao cấp', 'Sổ tay bìa da cao cấp', 50, 20),
       ('Tai nghe Bluetooth', 'Tai nghe không dây chất lượng cao', 300, 10)
     ON CONFLICT DO NOTHING`,
  );

  logger.log('Sample gifts created');

  await queryRunner.release();
  await dataSource.destroy();

  logger.log('Seed completed!');
}

seed().catch((err) => {
  logger.error(err);
  process.exit(1);
});
