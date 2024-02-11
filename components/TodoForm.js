import { useRef, useState } from "react";

const TodoForm = (props)=>{
    const [showForm, setShowForm] = useState(false);
    const titleRef = useRef();
    const descriptionRef = useRef();

    const clearTodoHandler = ()=>{
        titleRef.current.value = "";
        descriptionRef.current.value = "";
    }
    const submitTodoHandler = (event)=>{
        event.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const todo = {
            id: Math.random().toString(),
            title: title,
            description: description
        }
        props.onAddTodo(todo);
        setShowForm(false);
    }

    return(
        <section className="w-3/6 m-auto mt-10 border-2 p-8 rounded-lg border-pink-600 bg-pink-100">
            {showForm ? 
                <form onSubmit={submitTodoHandler}>
                    <input type="text" placeholder="Task" ref={titleRef} className="w-full border-2 border-pink-500 bg-pink-100 rounded-lg pl-2 p-1 my-2 focus:outline-none focus:border-2 focus:border-pink-800" required />
                    <input type="text" placeholder="Description" ref={descriptionRef} className="w-full border-2 border-pink-500 bg-pink-100 rounded-lg pl-2 p-1 my-2 focus:outline-none focus:border-2 focus:border-pink-800" required />
                    <button type="button" onClick={clearTodoHandler} className="bg-pink-700 text-white w-full p-1.5 my-2 rounded-lg text-bold hover:bg-pink-800">Clear</button>
                    <button type="submit" className="bg-pink-700 text-white w-full p-1.5 my-2 rounded-lg text-bold hover:bg-pink-800">Add Todo</button>
                </form> : 
                <button onClick={()=>setShowForm(true)} className="w-full bg-pink-700 rounded-md p-2 hover:bg-pink-800 text-white">Add Todo</button>
            }
        </section>
    );
}

export default TodoForm;