# 📝 Blog Management System (Backend)

A complete **Blog Management System Backend** built with **Node.js, Express, MongoDB**, featuring **Cookie‑Based Authentication**, **OTP Verification**, **JWT**, and **Image Uploads**.

---

## 🚀 Features

✅ User Registration & Login

✅ Cookie‑Based Authentication 🍪

✅ OTP Verification via Email 📧

✅ JWT Security 🔐

✅ Create / Read / Update / Delete Blogs ✍️

✅ Image Upload using Multer 🖼️

✅ MongoDB with Mongoose 📦

✅ Protected Routes for Authenticated Users only 🚫

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (jsonwebtoken)**
* **bcryptjs**
* **cookie-parser**
* **nodemailer**
* **multer**
* **dotenv**
* **nodemon**

---

## video 






## 📂 Project Structure

```bash
Blog-app/
│
├──frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Signin.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── VerifyOtp.jsx
│   │   │   └── CreateBlog.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── app.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
backend/
│
├── config/
│   ├── db.js
│   ├── jwt.js
│   └── multer.js
│
├── controllers/
│   ├── Auth_controller.js
│   ├── Blog_controller.js
│   └── OTP_controller.js
│
├── middlewares/
│   └── Auth_Middleware.js
│
├── models/
│   ├── Auth_Models.js
│   ├── Blog_Model.js
│   └── Otp_Model.js
│
├── routes/
│   └── Auth_Routes.js
│
├── services/
│   └── Otp_services.js
│
├── uploads/
├── .env
├── package.json
└── server.js
```

---

## ⚙️ Environment Variables (.env)

Create a `.env` file in the backend root:

```env
PORT=4444
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL=your_email@gmail.com
PASS=your_app_password
```

⚠️ **Note:** Use Gmail App Password for EMAIL & PASS

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ▶️ Run the Server

```bash
npm run dev
```

Server will start at:

👉 `http://localhost:4444`

---

## 🔐 Authentication Flow

1️⃣ User **Sign Up**

2️⃣ User **Sign In** with Email & Password

3️⃣ OTP sent to registered Email 📩

4️⃣ OTP Verification

5️⃣ JWT generated & stored in **HTTP‑Only Cookie** 🍪

6️⃣ User can access protected routes

---

## 📡 API Endpoints

### 🔑 Auth APIs

| Method | Endpoint   | Description            |
| ------ | ---------- | ---------------------- |
| POST   | /signup    | Register new user      |
| POST   | /signin    | Login user & send OTP  |
| POST   | /verifyOtp | Verify OTP & issue JWT |
| GET    | /signout   | Logout user            |

---

### 📝 Blog APIs

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | /createBlog      | Create blog (Auth required) |
| GET    | /getBlogs        | Get all blogs               |
| PUT    | /updateBlogs/:id | Update blog                 |
| DELETE | /deleteBlogs/:id | Delete blog                 |

📌 Image upload key: `image`

---

## 🧪 API Testing

✔ Tested using **Postman**

✔ Cookies enabled (`withCredentials: true`)

✔ Image upload via `multipart/form-data`

---

## 🔒 Security

* Passwords hashed using **bcryptjs**
* JWT stored in **HTTP‑Only Cookies**
* Protected routes secured via middleware
* Sensitive data never exposed

---

## 📌 Project Status

✅ Backend Completed

🚧 Frontend Integration (In Progress)

---

## 👨‍💻 Author

**Tanmay Patil** 💻🔥


