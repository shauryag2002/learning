import express from "express";
import cors from "cors";
import { Todo } from '@repo/types';

const app = express();

app.use(cors())
app.use(express.json())

const todos: Todo[] = [
    // example:
    // {
    //     name: "Go to gym",
    //     isCompleted: false,
    //     id: 123
    // }
]
app.get("/", (req, res) => {
    // GET THE TODOS
    res.json(todos)
});

app.post("/", (req, res) => {
    const todoItem = req.body;
    todos.push(todoItem);
    res.json({
        ...todoItem
    })
})

app.delete("/:id", (req, res) => {
    const deleteItemId = req.params.id;
    todos.splice(todos.findIndex((todos) => todos.id === deleteItemId), 1)

    res.json({
        todos
    })
})

app.listen(3200, () => {
    console.log("Server is running on port 3200");
});
