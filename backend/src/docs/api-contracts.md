# 🚀 TaxPal Backend API

TaxPal is a financial tracking REST API that allows users to:

- 🔐 Register & Login securely (JWT Authentication)
- 💳 Log income and expenses
- 📊 View financial dashboard summary
- 📈 Create and manage monthly budgets
- 📉 Track real-time budget progress

---

# 🏗 System Architecture Overview

```
Client (Frontend / Postman)
        │
        ▼
   Express Routes
        │
        ▼
   Controllers
        │
        ▼
   Services (Business Logic)
        │
        ▼
   MongoDB (Mongoose Models)
```

---

# 🔄 Authentication Flow Diagram

```
User → Register/Login
        │
        ▼
Auth Controller
        │
        ▼
Validate Input
        │
        ▼
Hash Password (bcrypt)
        │
        ▼
Create / Verify User
        │
        ▼
Generate JWT Token
        │
        ▼
Return Token to Client
        │
        ▼
Client stores token
        │
        ▼
Protected Route Access
(Authorization: Bearer <token>)
```

---

# 💳 Transaction API Flow

```
Client Request (POST /transactions)
        │
        ▼
Auth Middleware
(Verify JWT)
        │
        ▼
Transaction Controller
        │
        ▼
Transaction Service
        │
        ▼
Save Transaction (MongoDB)
        │
        ▼
Return Standard API Response
```

---

# 📊 Dashboard Summary Flow

```
GET /api/dashboard/summary
        │
        ▼
Auth Middleware
        │
        ▼
Dashboard Controller
        │
        ▼
Transaction Service
        │
        ▼
Aggregate Income & Expenses
        │
        ▼
Return:
- totalIncome
- totalExpense
- balance
```

---

# 📈 Budget Progress Flow

```
GET /api/budgets/progress?month=YYYY-MM
        │
        ▼
Auth Middleware
        │
        ▼
Budget Controller
        │
        ▼
Fetch Budgets (Month Filter)
        │
        ▼
Fetch Transactions (Month + Category)
        │
        ▼
Calculate:
- spent
- remaining
- percentage
- status
        │
        ▼
Return Budget Progress Data
```

---

# 📦 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- REST API Architecture

---

# ⚙️ Setup Instructions

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Setup Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

## 3️⃣ Run Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

# 🔐 Authentication

All protected routes require:

```
Authorization: Bearer <token>
```

---

# 📘 API Modules

---

## 🔐 AUTH MODULE

### POST `/api/auth/register`

```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "Password@123",
  "country": "India",
  "incomeBracket": "middle"
}
```

### POST `/api/auth/login`

```json
{
  "email": "john@gmail.com",
  "password": "Password@123"
}
```

---

## 💳 TRANSACTIONS MODULE

- POST `/api/transactions`
- GET `/api/transactions`
- PUT `/api/transactions/:id`
- DELETE `/api/transactions/:id`

---

## 📊 DASHBOARD MODULE

- GET `/api/dashboard/summary`

Returns:

```json
{
  "totalIncome": 50000,
  "totalExpense": 20000,
  "balance": 30000
}
```

---

## 📈 BUDGET MODULE

- POST `/api/budgets`
- GET `/api/budgets`
- GET `/api/budgets/progress?month=2026-02`

---

# 🗂 Allowed Budget Categories

Defined in:

```
backend/src/utils/constants.js
```

```js
const CATEGORIES = [
  "Food",
  "Rent",
  "Utilities",
  "Travel",
  "Marketing"
];
```

---

# 🛡 Security Features

- JWT-based authentication
- Protected routes using middleware
- User ownership validation
- Centralized error handling
- Standardized API response format

---

# 📁 Project Structure

```
backend/
 ├── controllers/
 ├── services/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── utils/
 └── docs/
```

### Architecture Principle

- Controllers → Handle request/response
- Services → Business logic
- Models → Database schema
- Routes → Endpoint mapping
- Middlewares → Authentication & error handling
- Utils → Constants & helpers

---

# 🏁 Current Status

✔ Authentication  
✔ Transactions CRUD  
✔ Dashboard Summary  
✔ Budget Module  
✔ API Documentation  
✔ Flow Diagrams  

---

## 👨‍💻 Author

Built with ❤️ by Batch-4

