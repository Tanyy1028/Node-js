# 📚 Bookstore Backend API
## 🚀 Features

* Connects to MongoDB database
* Add, Read, Update, and Delete books
* Logger middleware to log all incoming requests
* Organized project structure
* RESTful API design

---

## 📁 Project Structure

```
Bookstore-backend/
│
├── server.js            # Entry point
├── config/db.js         # MongoDB connection
├── routes/bookRoutes.js # API routes
├── middleware/logger.js # Logger middleware
├── models/bookModel.js  # Mongoose book model
├── package.json
└── node_modules/
```

---
# video 






https://github.com/user-attachments/assets/7e003a3f-a067-42d8-98ae-c79e94cdc548







## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB / Mongoose
* Nodemon
* Custom Logger Middleware

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Project

```bash
git clone https://github.com/Tanyy1028/Node-js.git
cd Node-js/database/Bookstore/backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure MongoDB

* Open `config/db.js`
* Replace the connection string with your MongoDB URI

### 4️⃣ Start Server

```bash
npm run dev   # Using nodemon for development
npm start     # Normal run
```

### 5️⃣ Server URL

```
http://localhost:4333/api
```

---

## 🔹 API Endpoints

### Get All Books

```
GET /api/books
```

### Get Book by ID

```
GET /api/books/:id
```

### Add a New Book

```
POST /api/books
```

**Body Example:**

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 399,
  "category": "Self Help"
}
```

### Update a Book

```
PUT /api/books/:id
```

**Body Example:**

```json
{
  "price": 450
}
```

### Delete a Book

```
DELETE /api/books/:id
```

---

## 📝 Logger Middleware

All incoming requests are logged with method, URL, and timestamp in the server console or a log file (depending on your logger setup).

---

## 🧪 Testing

* Use **Postman** or **Insomnia** to test all endpoints
* Verify CRUD operations
* Check the server console/logs for logger output

---

## 👨‍💻 Author

**Tanmay Patil**
