# 🛍️ ShopHub — MERN E-Commerce App

A full-stack **MERN (MongoDB, Express, React, Node.js)** e-commerce admin & product management application.

## 🚀 Features

✨ User Authentication (Register & Login)
🛡️ Protected Routes with JW
📦 Product Management (Add & View)
🗂️ Category Management (Admin Only)
🔗 MongoDB Population (Category & User)
🎨 Clean Responsive UI
⚡ Axios API Integration

---

## 🧱 Tech Stack

**Frontend**

* ⚛️ React (Vite)
* 🔄 React Router DOM
* 📡 Axios
* 🎨 Inline CSS

**Backend**

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB + Mongoose
* 🔐 JWT Authentication
* 🍪 Cookie Parser
* 🌐 CORS

---

## 📁 Project Structure

```
e-com/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── pages/
    │   ├── components/
    │   └── App.jsx
```

---


### Auth

| Method | Route                | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

---

### Categories

| Method | Route                 | Access |
| ------ | --------------------- | ------ |
| GET    | `/api/categories`     | Public |
| POST   | `/api/categories`     | Admin  |
| PUT    | `/api/categories/:id` | Admin  |
| DELETE | `/api/categories/:id` | Admin  |

---

### Products

| Method | Route               | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/products`     | Get all products |
| POST   | `/api/products`     | Create product   |
| PUT    | `/api/products/:id` | Update           |
| DELETE | `/api/products/:id` | Delete           |

---

## 🧠 Important Notes

⚠️ Admin required to create categories
⚠️ Category must exist before adding product
⚠️ MongoDB must be connected
⚠️ JWT cookie required for protected routes

---

## 🐞 Common Errors & Fix

**❌ Cast to ObjectId failed**

👉 Make sure category `_id` is sent from frontend.

**❌ 500 Internal Server Error**

👉 Check:

* MongoDB connection
* Required fields
* Console logs

**❌ CORS Error**

👉 Ensure backend CORS origin:

```js
origin: "http://localhost:5173"
```

---

## 🌟 Future Improvements

* 🖼 Product image upload
* 🔍 Search & filter
* 🛒 Cart system
* 💳 Payment integration
* 🎨 Tailwind UI
* 📱 Fully responsive design


