# 📄 HTTP Logger Server (Node.js)

## 🚀 Features

* Built using **pure Node.js** (no Express)
* Logs every request to a file (`one.txt`)
* Handles multiple routes:

  * `/`
  * `/about`
  * `/service`
  * `/portfolio`
* Supports HTTP methods:

  * GET
  * POST
  * PUT
  * DELETE
* Displays proper responses for each route & method

---

## 📁 Project Structure

```
logger/
│
├── server.js
├── one.txt
└── package.json
```

---

## 🛠️ Technologies Used

* Node.js
* http module
* fs module

---

## ⚙️ Setup & Run

### 1️⃣ Install Node.js

Make sure Node.js is installed:

```bash
node -v
```

---

### 2️⃣ Run the Server

```bash
node server.js
```

---

### 3️⃣ Server URL

```
http://localhost:4141
```

---

## 📌 Routes & Methods

### 🏠 Home Route `/`

| Method | Response                 |
| ------ | ------------------------ |
| GET    | Home page-GET request    |
| POST   | Home page-POST request   |
| PUT    | Home page-PUT request    |
| DELETE | Home page-DELETE request |

---

### ℹ️ About Route `/about`

| Method | Response                  |
| ------ | ------------------------- |
| GET    | About page-GET request    |
| POST   | About page-POST request   |
| PUT    | About page-PUT request    |
| DELETE | About page-DELETE request |

---

### 🛠️ Service Route `/service`

| Method | Response                    |
| ------ | --------------------------- |
| GET    | Service page-GET request    |
| POST   | Service page-POST request   |
| PUT    | Service page-PUT request    |
| DELETE | Service page-DELETE request |

---

### 📁 Portfolio Route `/portfolio`

| Method | Response                      |
| ------ | ----------------------------- |
| GET    | Portfolio page-GET request    |
| POST   | Portfolio page-POST request   |
| PUT    | Portfolio page-PUT request    |
| DELETE | Portfolio page-DELETE request |

---

## 📝 Log File (`one.txt`)

Each request is logged in the following format:

```
client request on http://localhost:4141/about by GET at 10/0/2026 | 14:30:21 from this IP: ::1
```

---

## 🧪 Testing

* Test routes using **browser** (GET)
* Use **Postman** for POST, PUT, DELETE requests

---

## 👨‍💻 Author

**Tanmay Patil**
