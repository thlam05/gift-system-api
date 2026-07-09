Tổng hợp endpoints

| Method | Route | Auth | Role | Mô tả |
|--------|-------|------|------|-------|
| POST | `/auth/register` | — | — | Đăng ký |
| POST | `/auth/login` | — | — | Đăng nhập user |
| POST | `/auth/admin/login` | — | — | Đăng nhập admin |
| GET | `/users/profile` | JWT | — | Xem profile |
| PATCH | `/users/profile` | JWT | — | Cập nhật profile |
| GET | `/users` | JWT | admin | Danh sách users |
| GET | `/gifts` | JWT | — | DS quà active |
| GET | `/gifts/:id` | JWT | — | Chi tiết quà active |
| POST | `/admin/gifts` | JWT | admin | Tạo quà |
| GET | `/admin/gifts` | JWT | admin | DS tất cả quà |
| GET | `/admin/gifts/:id` | JWT | admin | Chi tiết quà |
| PATCH | `/admin/gifts/:id` | JWT | admin | Cập nhật quà |
| DELETE | `/admin/gifts/:id` | JWT | admin | Xoá quà |
