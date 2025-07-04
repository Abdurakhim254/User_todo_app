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
