import { MongoClient } from "mongodb";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

const CompletedTask = (props) => {
  const [showDesc, setShowDesc] = useState(false);
  const router = useRouter();

  const deleteTodoHandler = async (todoId) => {
    const res = await fetch(`/api/delete-todo?todoId=${todoId}`, {
      method: "DELETE",
    });
    // console.log(res);
    router.push("/completedtask");
  };
  const updateTodoHandler = async (id, status) => {
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

  return (
    <div className="w-3/6 m-auto my-10">
        <button className="bg-pink-700 text-slate-200 hover:text-slate-300 w-40 p-1.5 my-2 rounded-lg font-bold hover:bg-pink-800">
          <Link href="..">
            Back
          </Link>
        </button>
        <section className="w-full m-auto mt-2 border-2 p-8 rounded-lg border-pink-600 bg-pink-100">
            <h2 className="text-xl font-bold text-pink-500 mb-4 text-center">Completed Todos</h2>
            {props.todos && props.todos.length > 0 ? (
                    props.todos.map((todo) => (
                        <div key={todo.id} className="pl-4 py-4 mb-2 bg-pink-200 rounded-md" onClick={()=>setShowDesc(!showDesc)}>
                            <div className="flex justify-between">
                                <span className="flex gap-2">
                                <input type="checkbox" className="accent-pink-600 rounded-lg" onChange={()=>updateTodoHandler(todo.id, todo.status)} checked={todo.status === 'completed'} />
                                <span className="py-2 text-pink-600 font-semibold">{todo.title}</span>
                                </span>
                                <MdDelete
                                    onClick={() => deleteTodoHandler(todo.id)}
                                    className="text-red-500 text-3xl cursor-pointer mr-8"
                                />
                            </div>
                            {showDesc && <div className="text-pink-400">{todo.description}</div>}
                        </div>
                    ))
            ) : (
                <p className="text-center text-pink-700 font-bold">No Todos Here</p>
            )}
        </section>
    </div>
  );
};

export default CompletedTask;

export async function getStaticProps() {
    const client = await MongoClient.connect(
      "mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/todos"
    );
    const db = client.db();
    const todoCollection = db.collection("todosdb");
    const todos = await todoCollection
      .find({ status: "completed" })
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
  