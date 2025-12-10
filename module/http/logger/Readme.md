# **Node.js HTTP Server – Logging Requests**

This project is a simple Node.js HTTP server built using the native `http` module.
It handles different HTTP methods (GET, POST, PUT, DELETE) on the home route (`/`) and logs every request into `log_details.txt`.

---

## 📌 **Features**

* Handles multiple HTTP methods:

  * **GET**
  * **POST**
  * **PUT**
  * **DELETE**
* Logs detailed request information:

  * Request URL
  * HTTP Method
  * Date & Time
  * Client IP Address
* Saves logs in `log_details.txt`
* Returns proper HTTP status codes and messages
* Handles unknown routes with a 404 message

---

## 📂 **Project Structure**

```
project-folder/
│── server.js
│── log_details.txt
│── README.md
```

---

## 🚀 **How to Run the Server**

### **1. Install Node.js**

Make sure Node.js is installed on your system.
Download from: [https://nodejs.org](https://nodejs.org)


---

## ▶️ **Start the server**

Run this command:

```bash
node server.js
```

You should see:

```
server live on http://localhost:4444
```

---

## 🧪 **Testing the API**

### **GET Request**

```
http://localhost:4444/
```

### **POST Request**

Use Postman / Thunder Client

```
POST http://localhost:4444/
```

### **PUT Request**

```
PUT http://localhost:4444/
```

### **DELETE Request**

```
DELETE http://localhost:4444/
```

---

## 📝 **Logging Output Example (`log_details.txt`)**

```
request sent on http://localhost:/ by GET at 7/12/2025 | 12:30:10 at ip address ::1
request sent on http://localhost:/ by POST at 7/12/2025 | 12:30:15 at ip address ::1
```

