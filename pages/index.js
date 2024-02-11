import { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoLists from "../components/TodoLists";
import { FaCirclePlus } from "react-icons/fa6";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

const HomePage = (props)=>{
    const router = useRouter();
    const [showTodoForm, setShowTodoForm] = useState(false);

    const addTodo = async(newTodo)=>{
        const res = await fetch('/api/new-todo', {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
        setShowTodoForm(false);
        router.push('/');
    }
    const deleteTodo = (todoId)=>{
        // setTodos(todos.filter((todo)=>(todo.id !== todoId)));
    }
    const showFormHandler = ()=>{
        setShowTodoForm(true);
    }
    return(
        <div className="w-3/6 m-auto my-10">
            <h1 className="font-bold text-3xl text-center text-pink-700">Today</h1>
            <div className="w-3/4 m-auto">
                <TodoLists todos={props.todos} onDeleteTodo={deleteTodo} />
                {!showTodoForm && <FaCirclePlus onClick={showFormHandler} className="text-pink-600 my-1 text-3xl cursor-pointer" />}
            </div>
            {showTodoForm && <TodoForm onAddTodo={addTodo} />}
        </div>
    );
}

export default HomePage;

export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/todos');
    const db = client.db();
    const todoCollection = db.collection('todosdb');
    const todos = await todoCollection.find().toArray();
    client.close();
    return {
        props: {
            todos: todos.map((todo)=>({
                id: todo._id.toString(),
                title: todo.title,
                description: todo.description
            }))
        },
        revalidate: 1
    }
}