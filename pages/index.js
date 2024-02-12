import { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoLists from "../components/TodoLists";
import { FaCirclePlus } from "react-icons/fa6";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import Link from "next/link";

const HomePage = (props) => {
  const router = useRouter();
  const [showTodoForm, setShowTodoForm] = useState(false);

  const addTodo = async (newTodo) => {
    const res = await fetch("/api/new-todo", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res);
    setShowTodoForm(false);
    router.push("/");
  };
  const deleteTodo = async (todoId) => {
    const res = await fetch(`/api/delete-todo?todoId=${todoId}`, {
      method: "DELETE",
    });
    // console.log(res);
    router.push("/");
    // setTodos(todos.filter((todo)=>(todo.id !== todoId)));
  };
  const updateTodo = async (id, status) => {
    const todoStatus = status === "incomplete" ? "completed" : "incomplete";

    const res = await fetch(`/api/update-todo?todoId=${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: todoStatus,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res);
    router.push("/");
  };
  const showFormHandler = () => {
    setShowTodoForm(true);
  };
  return (
    <div className="w-3/6 m-auto my-10">
      <h1 className="font-bold text-3xl text-center text-pink-700">Today</h1>
        <button className="bg-pink-700 text-slate-200 hover:text-slate-300 w-40 p-1.5 my-2 rounded-lg font-bold hover:bg-pink-800">
          <Link href="/completedtask" className="">
            Completed Todos
          </Link>
        </button>
        <TodoLists
          todos={props.todos}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />
        {!showTodoForm && (
          <FaCirclePlus
            onClick={showFormHandler}
            className="text-pink-600 my-1 text-3xl cursor-pointer"
          />
        )}
      {showTodoForm && <TodoForm onAddTodo={addTodo} />}
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/todos"
  );
  const db = client.db();
  const todoCollection = db.collection("todosdb");
  const todos = await todoCollection
    .find({ status: "incomplete" })
    .toArray();
  client.close();
  return {
    props: {
      todos: todos.map((todo) => ({
        id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
        status: todo.status,
      })),
    },
    revalidate: 1,
  };
}
