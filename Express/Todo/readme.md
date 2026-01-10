# 📝 Todo Express API
## 🚀 Features

* Create Todo
* Read All Todos
* Read Todo by ID
* Update Todo
* Delete Todo
* Filter by status
* Search by title
* Filter by due date
* JSON file based storage (`todo.json`)

---

## 📁 Project Structure

```
Todo/
│
├── server.js
├── todo.json
├── package.json
└── node_modules/
```

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* Nodemon
* File System (fs)
* Postman (for API testing)

---

# video










## ⚙️ Installation & Setup

### 1️⃣ Clone or Download the Project

```bash
git clone <repository-url>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Server (Development Mode)

```bash
npm run dev
```

### 4️⃣ Server URL

```
http://localhost:4000
```

---

## 📌 API Endpoints

### 🔹 Get All Todos

**GET** `/`

Optional Query Params:

* `status=pending`
* `search=node`
* `dueDate=2026-01-15`

Example:

```
GET http://localhost:4000/?status=pending
```

---

### 🔹 Get Todo by ID

**GET** `/:id`

Example:

```
GET http://localhost:4000/1
```

---

### 🔹 Create Todo

**POST** `/`

Body (JSON):

```json
{
  "id": 3,
  "title": "Learn Express",
  "status": "pending",
  "dueDate": "2026-01-15"
}
```

---

### 🔹 Update Todo

**PUT** `/:id`

Body (JSON):

```json
{
  "status": "completed"
}
```

---

### 🔹 Delete Todo

**DELETE** `/:id`

Example:

```
DELETE http://localhost:4000/3
```

---

## 📂 Sample `todo.json`

```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "status": "pending",
    "dueDate": "2026-01-10"
  }
]
```

---

## 🧪 Testing

* Use **Postman** to test all API endpoints
* Verify CRUD operations
* Check filters and search functionality

---

## 👨‍💻 Author

**Tanmay Patil**

