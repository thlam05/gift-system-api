Tổng hợp endpoints

| Method | Route | Auth | Role | Query | Mô tả |
|--------|-------|------|------|-------|-------|
| POST | `/auth/register` | — | — | — | Đăng ký |
| POST | `/auth/login` | — | — | — | Đăng nhập user |
| POST | `/auth/admin/login` | — | — | — | Đăng nhập admin |
| GET | `/users/profile` | JWT | — | — | Xem profile |
| PATCH | `/users/profile` | JWT | — | — | Cập nhật profile |
| GET | `/users` | JWT | admin | `?page=1&limit=10` | Danh sách users |
| GET | `/gifts` | JWT | — | `?page=1&limit=10` | DS quà active |
| GET | `/gifts/:id` | JWT | — | — | Chi tiết quà active |
| POST | `/admin/gifts` | JWT | admin | — | Tạo quà |
| GET | `/admin/gifts` | JWT | admin | `?page=1&limit=10` | DS tất cả quà |
| GET | `/admin/gifts/:id` | JWT | admin | — | Chi tiết quà |
| PATCH | `/admin/gifts/:id` | JWT | admin | — | Cập nhật quà |
| DELETE | `/admin/gifts/:id` | JWT | admin | — | Xoá quà |

**Pagination:** Các endpoint list hỗ trợ query params `page` (mặc định 1) và `limit` (mặc định 10, tối đa 100).

Response có dạng:
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```
