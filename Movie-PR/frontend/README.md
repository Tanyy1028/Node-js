# 🎬 Movie Management System

A complete **Full Stack Movie Management Application** built using **React.js, Node.js, Express.js, and MongoDB**.
This project allows users to **add, view, update, delete, and search movies** with poster upload support and an aesthetic dark UI.

---

## 🌟 Project Highlights

* Full CRUD functionality
* Poster image upload
* Search movies by title
* Aesthetic dark + muted red UI
* Clean and scalable code structure
* RESTful API integration

---
## Video







## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS (Aesthetic Dark Theme)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer (Image Upload)

---

## ✨ Features

### 🎥 Movie Management

* Add new movies with poster
* View all movies
* View movie details
* Update movie information
* Delete movies

### 🔍 Search

* Search movies by title in real time

### 🎨 UI

* Dark aesthetic theme
* Muted red accent buttons
* Responsive layout
* Smooth hover effects

---

## 📂 Project Structure

```
movie-management-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── MovieList.jsx
│   │   │   ├── DetailMovie.jsx
│   │   │   ├── AddMovie.jsx
│   │   │   └── UpdateMovie.jsx
│   │   ├── App.jsx
│   │   └── *.css
│   └── package.json
│
├── backend/
│   ├── models/
│   │   └── Movie.js
│   ├── routes/
│   │   └── movieRoutes.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/movie-management-system.git
cd movie-management-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

➡️ Backend will run on:

```
http://localhost:5050
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

➡️ Frontend will run on:

```
http://localhost:3000
```

---

## ⚙️ Environment Variables (Backend)

Create a `.env` file inside `backend` folder:

```
PORT=5050
MONGO_URI=your_mongodb_connection_string
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description      |
| ------ | -------- | ---------------- |
| GET    | /api     | Get all movies   |
| GET    | /api/:id | Get single movie |
| POST   | /api     | Add new movie    |
| PUT    | /api/:id | Update movie     |
| DELETE | /api/:id | Delete movie     |


## 📸 UI Theme

* Dark aesthetic background
* Muted red accent buttons
* Clean cards and layouts
* Professional movie-app look 🎬

---

## 👨‍💻 Author

**Tanmay Patil**


