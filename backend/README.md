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
- `POST /api/v1/public/contact-messages` untuk mengirim pesan dari website
- `POST /api/v1/auth/login`
- `GET /api/v1/admin/dashboard` dengan header `Authorization: Bearer <token>`
- `GET/PATCH /api/v1/admin/profile`
- `GET/POST/PATCH/DELETE /api/v1/admin/pages`
- `GET/POST/PATCH/DELETE /api/v1/admin/services`
- `GET/POST/PATCH/DELETE /api/v1/admin/projects`
- `GET/POST/PATCH/DELETE /api/v1/admin/posts`
- `GET/POST/DELETE /api/v1/admin/media`
- `GET/PUT/DELETE /api/v1/admin/settings`
- `GET/PATCH/DELETE /api/v1/admin/users`
- `GET/PATCH/DELETE /api/v1/admin/messages`
- `GET /api/v1/contact-messages` dengan header `Authorization: Bearer <token>`
- `GET /api/v1/contact-messages/:id` dengan header `Authorization: Bearer <token>`
- `PATCH /api/v1/contact-messages/:id` dengan header `Authorization: Bearer <token>`
- `DELETE /api/v1/contact-messages/:id` dengan header `Authorization: Bearer <token>`

## Contact messages dengan XAMPP

Pastikan MySQL pada XAMPP berjalan, lalu buat database `northstar_company`.
Isi `DATABASE_URL` pada `.env`, kemudian jalankan:

```bash
npm run prisma:generate
npm run db:push
```

Data contact message akan disimpan pada tabel `contact_messages`.

## Login seed development

- Email: `admin@northstar.studio`
- Password: `northstar123`

Untuk production, ganti password seed dan `JWT_SECRET` sebelum deployment.
