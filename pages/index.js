import { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoLists from "../components/TodoLists";

const HomePage = ()=>{
    const [todos, setTodos] = useState([]);

    const addTodo = (newTodo)=>{
        setTodos((prevTodos)=>{
            return [...prevTodos, newTodo];
        })
    }
    const deleteTodo = (todoId)=>{
        setTodos(todos.filter((todo)=>(todo.id !== todoId)));
    }
    return(
        <div>
            <h1>Today</h1>
            <TodoForm onAddTodo={addTodo} />
            <TodoLists todos={todos} onDeleteTodo={deleteTodo} />
        </div>
    );
}

export default HomePage;