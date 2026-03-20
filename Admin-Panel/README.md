# Admin Panel - Complete Full Stack Project

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Axios
- **Backend**: Node.js + Express + MongoDB
- **Auth**: JWT + bcrypt + Email OTP (Nodemailer + Gmail)

## Features
✅ Register/Login with OTP verification
✅ Forgot Password with OTP
✅ Protected Admin Dashboard
✅ Users CRUD (Admin only)
✅ Products CRUD (Admin only)
✅ Modern UI with Sidebar
✅ Error handling & validation

## Quick Setup (5 mins)

### 1. Gmail App Password (REQUIRED for OTP)
```
1. Enable 2FA: myaccount.google.com/security
2. App passwords: myaccount.google.com/apppasswords
3. Select "Mail" → Generate
4. Copy 16-char code → .env EMAIL_PASS
```

### 2. Backend Setup
```
cd Admin-Panel/backend
npm install
npm run dev  # localhost:5000
```

### 3. Frontend Setup
```
cd Admin-Panel/frontend
npm install
npm run dev  # localhost:5173
```

### 4. Environment Variables (.env in backend/)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/adminpanel
JWT_SECRET=your-super-secret-jwt-key-change-in-production
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your16charapppassword
CLIENT_URL=http://localhost:5173
```

### 5. Test Flow
1. localhost:5173/register → Enter email/password → Check Gmail for OTP
2. Verify OTP → Login → Admin Dashboard
3. Add/Edit/Delete Users & Products

## Folder Structure
```
Admin-Panel/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   └── app.js
└── frontend/
    ├── src/pages/
    ├── src/context/
    ├── src/api/
    └── vite.config.js
```

## Troubleshooting
- **OTP not received**: Check spam + app password
- **500 Error**: Check backend console for exact error
- **Mongo**: Install MongoDB or use MongoDB Atlas

**Production Ready - Deploy to Render/Vercel + Mongo Atlas!** 🚀
