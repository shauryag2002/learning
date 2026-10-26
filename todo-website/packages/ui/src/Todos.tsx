"use client";

import { Todo } from "@repo/types";
import { useEffect, useState } from "react";

const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const fetchAllTodos = () => {
        fetch(`http://localhost:3200/`)
            .then((res) => res.json())
            .then((data) => setTodos(data));
    }
    const AddTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const todoName = event.target.value;
        fetch('http://localhost:3200/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: todoName, isCompleted: false, id: Date.now().toString() })
        }).then((res) => res.json()).then((data) => {
            setTodos((prev) => [...prev, data])
        })
    }
    const deleteTodo = (id: string) => {
        fetch(`http://localhost:3200/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json()).then((data) => {
            setTodos((prev) => prev.filter((todo) => todo.id !== id))
        })
    }
    useEffect(() => {
        fetchAllTodos();
    }, [])
    if (todos.length === 0) {
        return (
            <div>
                <input placeholder="Add your todo" onChange={AddTodo}></input>

                No todos found
            </div>
        )
    }
    return (
        <div>
            <input placeholder="Add your todo" onChange={AddTodo}></input>
            {todos.map((todo) => {
                return (
                    <div key={todo.id}>
                        {todo.name}
                        <button onClick={() => deleteTodo(todo.id)}>delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Todos;