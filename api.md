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

## Response Format

Tất cả response đều được wrap thống nhất:

### Thành công

```json
{
  "data": ...,
  "message": "Success"
}
```

### Có phân trang

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  },
  "message": "Success"
}
```

### Xoá thành công

```json
{
  "data": null,
  "message": "Success"
}
```

### Lỗi

```json
{
  "data": null,
  "message": "Gift not found",
  "statusCode": 404
}
```

### Validation lỗi

```json
{
  "data": null,
  "message": ["email must be an email", "password must be longer than 6"],
  "statusCode": 400
}
```
