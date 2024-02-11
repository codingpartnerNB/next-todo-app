
const TodoLists = (props)=>{
    return(
        <section className="w-3/6 m-auto mt-10 border-2 p-8 rounded-lg border-pink-600 bg-pink-100">
            {props.todos.map((todo)=>(
                <div key={todo.id} className="m-2 p-2">
                    <input type="radio" className="text-pink-700" />
                    <span className="p-4 text-pink-600">{todo.title}</span>
                    <button onClick={()=>props.onDeleteTodo(todo.id)} className="bg-pink-700 text-white py-2 px-4 rounded-lg text-bold hover:bg-pink-800">Delete</button>
                </div>
            ))}
        </section>
    );
}

export default TodoLists;