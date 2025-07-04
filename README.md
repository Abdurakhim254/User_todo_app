# User Todo App

A RESTful API built with **NestJS**, **Prisma**, and **PostgreSQL** for managing users and their todos.  
Includes authentication (JWT-based), user registration, and todo CRUD operations.

---

## 🚀 Tech Stack

- **NestJS** – Progressive Node.js framework
- **Prisma ORM** – Type-safe database access
- **PostgreSQL** – Relational database
- **JWT** – Authentication tokens
- **Bcrypt** – Password hashing
- **Railway** – Cloud deployment (optional)

---

## 📦 Features

- ✅ User registration and login
- 🔐 JWT-based authentication
- 🧑‍💻 Protected routes with custom `AuthGuard`
- ✅ Create, Read, Update, Delete Todos
- 🛠 Public/private route support via decorators
- 📄 Clean architecture with modules & services

---

## 📁 Project Structure

🌐 API Bazaviy URL

https://usertodoapp-production.up.railway.app


🔐 Avtorizatsiya (Auth)
📝 Ro'yxatdan o'tish

POST /auth/register


Body:

json

{
  "full_name": "Ali Valiyev",
  "email": "ali@example.com",
  "password": "12345678"
}


🔑 Login qilish

POST /auth/login
Body:

{
  "email": "ali@example.com",
  "password": "12345678"
}
Response:

{
  "access_token": "JWT_ACCESS_TOKEN",
  "refresh_token": "JWT_REFRESH_TOKEN"
}
👤 Profilni olish

GET /auth/me
Header:

Authorization: Bearer <access_token>
✏️ Profilni yangilash

PUT /auth/me
Header:


Authorization: Bearer <access_token>
Body:

{
  "full_name": "Ali Valijonov"
}
🔄 Access token yangilash

POST /auth/refresh
Body:

{
  "refresh_token": "<refresh_token>"
}
🔐 Parolni unutdim

POST /auth/forgot-password
Body:

{
  "email": "ali@example.com"
}
🔁 Parolni tiklash

POST /auth/reset-password
Body:

{
  "token": "RESET_TOKEN",
  "password": "newpassword123"
}
✅ Vazifalar (Tasks)
➕ Yangi vazifa yaratish

POST /tasks
Header:

Authorization: Bearer <access_token>
Body:

{
  "title": "Dars qilish",
  "description": "NestJS darsini tugatish"
}
📋 Vazifalar ro'yxati

GET /tasks
Header:

Authorization: Bearer <access_token>
🔍 Bitta vazifani olish

GET /tasks/:id
Header:

Authorization: Bearer <access_token>
✏️ Vazifani yangilash

PUT /tasks/:id
Header:

Authorization: Bearer <access_token>
🗑 Vazifani o‘chirish

DELETE /tasks/:id
Header:

Authorization: Bearer <access_token>
🛡 Admin Foydalanuvchilarni Boshqarish
⚠️ Ushbu route’lar faqat admin roli bilan ishlaydi.

👥 Barcha foydalanuvchilar

GET /admin/users
Header:

Authorization: Bearer <admin_access_token>
🔍 Foydalanuvchini olish (ID orqali)

GET /admin/users/:id
Header:

Authorization: Bearer <admin_access_token>
✏️ Foydalanuvchini yangilash

PUT /admin/users/:id

Authorization: Bearer <admin_access_token>
🗑 Foydalanuvchini o‘chirish

DELETE /admin/users/:id
Header:
Authorization: Bearer <admin_access_token>
---

## ⚙️ Installation

```bash
# 1. Clone the repo
git clone https://github.com/Abdurakhim254/User_todo_app.git
cd User_todo_app

# 2. Install dependencies
pnpm install

# 3. Create a .env file
cp .env.example .env

# 4. Push Prisma schema to your DB
npx prisma db push

# 5. Start the development server
pnpm start:dev