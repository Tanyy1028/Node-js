import http from "http";
import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import fs from "fs";

const server = express();
server.use(express.json());
const PORT = 1011;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "todo.json");



const readData = () => {

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
};

const writeData = (todos) => {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};


// Get all todos (with basic filtering)
server.get("/todo", (req, res) => {
    let todos = readData();

    const { status, search, dueDate } = req.query;

    if (status) {
        todos = todos.filter((todo) => todo.status === status);
    }

    if (search) {
        const q = search.toLowerCase();
        todos = todos.filter((todo) =>
            todo.title?.toLowerCase().includes(q)
        );
    }

    if (dueDate) {
        todos = todos.filter((todo) => todo.dueDate === dueDate);
    }

    res.json(todos);
});


//  Get single todo by ID
server.get("/todo/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid id (must be a number)" });
    }

    const todos = readData();
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
});

//  Create a new todo
server.post("/todo", (req, res) => {
    let todos = readData();
    const { title, description, status, dueDate } = req.body;

   
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    const newTodo = {
        id: newId,
        title,
        description: description || "",
        status: status || "pending", 
        dueDate: dueDate || null,    
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    writeData(todos);

    res.status(201).json(newTodo);
});

//  Update a todo
server.put("/todo/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid id (must be a number)" });
    }

    let todos = readData();
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const { title, description, status, dueDate } = req.body;

    if (title !== undefined) todos[index].title = title;
    if (description !== undefined) todos[index].description = description;
    if (status !== undefined) todos[index].status = status;
    if (dueDate !== undefined) todos[index].dueDate = dueDate;

    writeData(todos);

    res.json(todos[index]);
});

// Delete a todo
server.delete("/todo/:id", (req, res) => {
    let todos = readData();
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid id (must be a number)" });
    }

    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const deleted = todos[index];
    todos = todos.filter((todo) => todo.id !== id);
    writeData(todos);

    res.json(deleted);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});