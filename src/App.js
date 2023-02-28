import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const DATA = [
  {
    id: 1,
    title: "Make a todo app",
  },
  {
    id: 2,
    title: "Make a calculator app",
  },
];
if (localStorage.getItem("todos") === null) {
  localStorage.setItem("todos", JSON.stringify(DATA));
}
function ListTodos({ title, id, deleteTodo }) {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <div className="flex justify-between items-center py-3 border-b">
      <div className="flex gap-10 items-center">
        <input type="checkbox" onClick={() => setIsCheck(!isCheck)} />
        <p className={`${isCheck && "line-through"}`}>{title}</p>
      </div>
      <button
        className="text-red-700 bg-slate-200 rounded-full w-10 h-10 flex justify-center items-center text-base"
        onClick={() => deleteTodo(id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default function Todos() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("todos")));
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
    console.log("1");
  }, [data]);
  function addNewTodo(title) {
    setData((data) => [
      ...data,
      { id: data[data.length - 1]?.id + 1 || 1, title: title },
    ]);
    setInputValue("");
  }
  function deleteTodo(id) {
    let newValue = data.filter((item) => item.id !== id);
    setData(newValue);
  }
  return (
    <div className="flex justify-center items-center font-bold text-2xl">
      <div className="w-[40%] text-center">
        <h1 className="text-6xl">Todos</h1>
        <form
          className="flex items-center text-lg w-full  shadow-xl border p-3 rounded-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="add Todos"
            className="w-full outline-none"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white rounded-full w-10 h-10 flex justify-center items-center text-md"
            onClick={() => {
              if (inputValue) {
                addNewTodo(inputValue);
              }
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
        {data?.length === 0 && <p className="text-2xl">No Todos</p>}
        {data?.map((item, i) => {
          return <ListTodos key={item.id} {...item} deleteTodo={deleteTodo} />;
        })}
      </div>
    </div>
  );
}
