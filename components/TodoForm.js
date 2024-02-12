import { useRef } from "react";

const TodoForm = (props)=>{
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
            title: title,
            description: description,
            status: "incomplete"
        }
        props.onAddTodo(todo);
    }

    return(
        <section className="w-full m-auto mt-6 border-2 p-8 rounded-lg border-pink-600 bg-pink-100">
            <form onSubmit={submitTodoHandler}>
                <input type="text" placeholder="Task" ref={titleRef} className="w-full border-2 border-pink-500 bg-pink-100 rounded-lg pl-2 p-1 my-2 focus:outline-none focus:border-2 focus:border-pink-800" required />
                <input type="text" placeholder="Description" ref={descriptionRef} className="w-full border-2 border-pink-500 bg-pink-100 rounded-lg pl-2 p-1 my-2 focus:outline-none focus:border-2 focus:border-pink-800" required />
                <div className="flex justify-evenly">
                    <button type="button" onClick={clearTodoHandler} className="bg-pink-700 text-slate-200 hover:text-slate-300 w-40 p-1.5 my-2 rounded-lg font-bold hover:bg-pink-800">Clear</button>
                    <button type="submit" className="bg-pink-700 text-slate-200 hover:text-slate-300 w-40 p-1.5 my-2 rounded-lg font-bold hover:bg-pink-800">Add Todo</button>
                </div>
            </form>
        </section>
    );
}

export default TodoForm;