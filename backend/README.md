# Northstar Company Profile API

Backend API untuk company profile dan admin dashboard menggunakan Node.js, Express.js, dan MySQL.

## Struktur

```text
backend/
├── database/
│   └── migrations/
├── src/
│   ├── config/          # Environment configuration
│   ├── controllers/     # HTTP request/response orchestration
│   ├── database/        # MySQL pool
│   ├── middleware/      # Auth, error handling, security
│   ├── repositories/    # SQL queries
│   ├── routes/          # API route declarations
│   ├── services/        # Business logic
│   ├── app.js           # Express app
│   └── server.js        # Process entrypoint
├── .env.example
└── package.json
```

## Setup

1. Pastikan MySQL pada XAMPP sudah berjalan.
2. Buat database `northstar_company` di phpMyAdmin, atau gunakan `npm run db:push` untuk membuat tabel dari schema Prisma.
3. Salin `.env.example` menjadi `.env`, lalu isi `DATABASE_URL` dan `JWT_SECRET`.
4. Jalankan `npm install` lalu `npm run prisma:generate`.
5. Jalankan `npm run db:push` dan `npm run db:seed`.
6. Jalankan `npm run dev`.

API tersedia di `http://localhost:4000`.

- `GET /health`
- `GET /api/v1/public/profile`
- `POST /api/v1/auth/login`
- `GET /api/v1/admin/dashboard` dengan header `Authorization: Bearer <token>`

## Login seed development

- Email: `admin@northstar.studio`
- Password: `northstar123`

Untuk production, ganti password seed dan `JWT_SECRET` sebelum deployment.
