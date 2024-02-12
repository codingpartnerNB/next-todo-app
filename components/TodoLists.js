import TodoItem from "./ToDoItem";

const TodoLists = (props) => {
  return (
    <section className="w-full m-auto mt-2 border-2 p-8 rounded-lg border-pink-600 bg-pink-100">
      {props.todos && props.todos.length > 0 ? props.todos.map((todo) => (
        <TodoItem
          id={todo.id}
          key={todo.id}
          title={todo.title}
          description={todo.description}
          status={todo.status}
          onDeleteTodo={props.onDeleteTodo}
          onUpdateTodo={props.onUpdateTodo}
        />
      )) : (
        <p className="text-center text-pink-700 font-bold">Add New Todo</p>
      )}
    </section>
  );
};

export default TodoLists;
