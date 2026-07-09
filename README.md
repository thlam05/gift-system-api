# Gift System API

Hệ thống quản lý quà tặng — RESTful API xây dựng với **NestJS** + **PostgreSQL** + **TypeORM**.

## Chức năng

- **Authentication** — đăng ký, đăng nhập user/admin, JWT (Passport + bcrypt)
- **User profile** — xem và cập nhật profile cá nhân
- **Gifts** — user xem danh sách quà active, admin full CRUD quà tặng
- **Phân quyền** — Role-based access control (user / admin) với RolesGuard
- **Pagination** — phân trang cho tất cả list endpoints
- **Response format** — response và error format thống nhất

## Công nghệ

| Stack | |
|-------|---|
| Framework | NestJS 11 |
| Database | PostgreSQL + TypeORM (migrations) |
| Auth | JWT + Passport + bcrypt |
| Validation | class-validator + class-transformer |
| Code quality | ESLint + Prettier |

## Cài đặt

**Yêu cầu:** Node.js 18+, Docker

```bash
# 1. Khởi tạo database bằng Docker
docker compose up -d

# 2. Cài dependencies
npm install

# 3. Cấu hình .env (xem bên dưới)

# 4. Build & chạy migration
npm run build
npm run migration:run

# 5. Seed dữ liệu mẫu (tuỳ chọn)
npm run seed
```

## Cấu hình `.env`

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE=gift_system

JWT_SECRET=supersecretkey123
JWT_EXPIRES_IN=7d
```

## Chạy

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Scripts

| Lệnh | Mô tả |
|------|-------|
| `docker compose up -d` | Khởi tạo database PostgreSQL |
| `docker compose down` | Dừng database |
| `npm run start:dev` | Dev với watch |
| `npm run build` | Build sang dist/ |
| `npm run start:prod` | Production |
| `npm run migration:run` | Chạy migration |
| `npm run migration:revert` | Revert migration |
| `npm run seed` | Seed dữ liệu mẫu |
| `npm run test` | Unit tests |
| `npm run test:e2e` | E2E tests |
| `npm run lint` | Lint + fix |

## Dữ liệu mẫu (seed)

- Admin: `admin@gift.com` / `admin123`
- 5 gifts mẫu: Gift Card 50K, 100K, Voucher Shopee, Sổ tay, Tai nghe Bluetooth

## API Endpoints

Base URL: `http://localhost:3000/api`

| Method | Route | Auth | Role |
|--------|-------|------|------|
| POST | `/auth/register` | — | — |
| POST | `/auth/login` | — | — |
| POST | `/auth/admin/login` | — | — |
| GET | `/users/profile` | JWT | — |
| PATCH | `/users/profile` | JWT | — |
| GET | `/users` | JWT | admin |
| GET | `/gifts` | JWT | — |
| GET | `/gifts/:id` | JWT | — |
| POST | `/admin/gifts` | JWT | admin |
| GET | `/admin/gifts` | JWT | admin |
| GET | `/admin/gifts/:id` | JWT | admin |
| PATCH | `/admin/gifts/:id` | JWT | admin |
| DELETE | `/admin/gifts/:id` | JWT | admin |

Chi tiết: xem `api.md` và `guide.md`

## Cấu trúc project

```
src/
├── main.ts                # Entry point
├── app.module.ts          # Root module
├── auth/                  # Module xác thực
├── users/                 # Module người dùng
├── gifts/                 # Module quà tặng
├── common/                # Shared: guards, decorators, interceptors, filters, dto
├── config/                # Database & env config
└── database/              # Migrations & seeds
```
