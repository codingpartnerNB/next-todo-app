import { useState } from "react";
import { MdDelete } from "react-icons/md";

const TodoItem = (props) => {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div key={props.id} className="pl-4 py-4 mb-2 bg-pink-200 rounded-md" onClick={()=>setShowDesc(!showDesc)}>
      <div className="flex justify-between">
        <span className="flex gap-2">
          <input type="radio" className="bg-pink-700" />
          <span className="py-2 text-pink-600">{props.title}</span>
        </span>
        <MdDelete
          onClick={() => props.onDeleteTodo(props.id)}
          className="text-red-500 text-3xl cursor-pointer mr-4"
        />
      </div>
      {showDesc && <div className="text-pink-500">{props.description}</div>}
    </div>
  );
};

export default TodoItem;
