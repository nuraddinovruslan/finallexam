# 🔍 HeadHunter Backend API

NestJS + PostgreSQL + JWT + Swagger bilan to'liq ish platformasi backend.

---

## 📁 Loyiha Tuzilmasi

```
src/
├── auth/                    # JWT autentifikatsiya
│   ├── auth.controller.ts   # /auth/register, /auth/login, /auth/profile
│   ├── auth.service.ts
│   ├── auth.dto.ts
│   ├── auth.module.ts
│   └── jwt.strategy.ts      # JWT token tekshirish
│
├── users/                   # Foydalanuvchilar
├── companies/               # Kompaniyalar
├── vacancies/               # Vakansiyalar
├── resumes/                 # Rezyumeler
├── applications/            # Arizalar
│
├── common/
│   ├── guards/
│   │   ├── jwt-auth.guard.ts   # Global JWT Guard
│   │   └── roles.guard.ts      # Rol tekshirish
│   └── decorators/
│       ├── public.decorator.ts      # @Public()
│       ├── roles.decorator.ts       # @Roles()
│       └── current-user.decorator.ts # @CurrentUser()
│
├── app.module.ts            # Asosiy modul
└── main.ts                  # Entry point + Swagger
```

---

## 🚀 O'rnatish

### 1. PostgreSQL bazasini yarating
```sql
CREATE DATABASE hh_db;
```

### 2. .env faylini sozlang
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=hh_db
JWT_SECRET=hh_super_secret_jwt_key_2024
JWT_EXPIRES_IN=7d
PORT=3000
```

### 3. Paketlarni o'rnating
```bash
npm install
```

### 4. Ishga tushiring
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

## 📄 Swagger bilan ishlash

1. Brauzerda oching: **http://localhost:3000/docs**
2. `POST /api/v1/auth/register` → ro'yxatdan o'ting
3. Javobdan `access_token` ni nusxalang
4. Yuqori o'ngdagi **🔓 Authorize** tugmasini bosing
5. Tokenni kiriting (faqat token, "Bearer" so'zsiz)
6. **Authorize** → **Close**
7. Endi barcha endpointlar ishlaydi ✅

---

## 🔗 API Endpointlar

### 🔐 Auth (ochiq)
| Method | URL | Tavsif |
|--------|-----|--------|
| POST | /api/v1/auth/register | Ro'yxatdan o'tish |
| POST | /api/v1/auth/login | Kirish + TOKEN olish |
| GET | /api/v1/auth/profile | O'z profili (token kerak) |

### 👤 Users (token kerak)
| Method | URL | Tavsif | Rol |
|--------|-----|--------|-----|
| GET | /api/v1/users | Barcha foydalanuvchilar | admin |
| GET | /api/v1/users/:id | Foydalanuvchi ma'lumoti | hammaga |
| PATCH | /api/v1/users/:id | Profil tahrirlash | o'zi/admin |
| PATCH | /api/v1/users/:id/role | Rol o'zgartirish | admin |
| DELETE | /api/v1/users/:id | O'chirish | admin |

### 🏢 Companies
| Method | URL | Tavsif | Rol |
|--------|-----|--------|-----|
| GET | /api/v1/companies | Barcha kompaniyalar | ochiq |
| GET | /api/v1/companies/:id | Kompaniya ma'lumoti | ochiq |
| GET | /api/v1/companies/my/list | Mening kompaniyalarim | employer |
| POST | /api/v1/companies | Yangi kompaniya | employer |
| PATCH | /api/v1/companies/:id | Tahrirlash | employer/admin |
| DELETE | /api/v1/companies/:id | O'chirish | employer/admin |

### 💼 Vacancies
| Method | URL | Tavsif | Rol |
|--------|-----|--------|-----|
| GET | /api/v1/vacancies | Barcha vakansiyalar | ochiq |
| GET | /api/v1/vacancies/:id | Vakansiya ma'lumoti | ochiq |
| GET | /api/v1/vacancies/company/:id | Kompaniya vakansiyalari | ochiq |
| POST | /api/v1/vacancies | Yangi vakansiya | employer |
| PATCH | /api/v1/vacancies/:id | Tahrirlash | employer/admin |
| DELETE | /api/v1/vacancies/:id | O'chirish | employer/admin |

### 📄 Resumes
| Method | URL | Tavsif | Rol |
|--------|-----|--------|-----|
| GET | /api/v1/resumes | Barcha rezyumeler | ochiq |
| GET | /api/v1/resumes/:id | Rezyume ma'lumoti | ochiq |
| GET | /api/v1/resumes/my/list | Mening rezyumelerim | jobseeker |
| POST | /api/v1/resumes | Yangi rezyume | jobseeker |
| PATCH | /api/v1/resumes/:id | Tahrirlash | jobseeker/admin |
| DELETE | /api/v1/resumes/:id | O'chirish | jobseeker/admin |

### 📨 Applications
| Method | URL | Tavsif | Rol |
|--------|-----|--------|-----|
| POST | /api/v1/applications | Ariza yuborish | jobseeker |
| GET | /api/v1/applications/my | Mening arizalarim | jobseeker |
| GET | /api/v1/applications/vacancy/:id | Vakansiya arizalari | employer |
| GET | /api/v1/applications/all | Barcha arizalar | admin |
| PATCH | /api/v1/applications/:id/status | Status o'zgartirish | employer/admin |
| DELETE | /api/v1/applications/:id | Bekor qilish | jobseeker/admin |

---

## 👥 Rol Tizimi

```
jobseeker  → rezyume yaratadi, vakansiyaga ariza yuboradi
employer   → kompaniya va vakansiya yaratadi, arizalarni ko'radi
admin      → hamma narsani boshqaradi
```

---

## 🔒 Xavfsizlik

- Barcha endpointlar JWT bilan himoyalangan (global guard)
- `@Public()` decorator bilan ochiq qilingan endpointlar:
  - GET /companies, GET /vacancies, GET /resumes
  - POST /auth/register, POST /auth/login
- Parollar bcryptjs bilan hash qilinadi (10 rounds)
- Token 7 kun amal qiladi
