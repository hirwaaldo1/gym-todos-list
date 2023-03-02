import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const DATA = [
  {
    id: 1,
    title: "Make a todo app",
    isCheck: false,
  },
  {
    id: 2,
    title: "Make a calculator app",
    isCheck: false,
  },
];
if (localStorage.getItem("todos") === null) {
  localStorage.setItem("todos", JSON.stringify(DATA));
}
function ListTodos({ title, id, deleteTodo, isCheck }) {
  const [isCheckValue, setIsCheckValue] = useState(isCheck);
  function checkboxCheck() {
    setIsCheckValue(!isCheckValue);
    let newData = JSON.parse(localStorage.getItem("todos")).map((item) => {
      if (item.id === id) {
        item.isCheck = !item.isCheck;
      }
      return item;
    });
    localStorage.setItem("todos", JSON.stringify(newData));
  }
  return (
    <div className="flex justify-between items-center py-3 border-b">
      <div className="flex gap-10 items-center">
        <input
          type="checkbox"
          checked={isCheckValue}
          onChange={checkboxCheck}
        />
        <p className={`${isCheckValue && "line-through"}`}>{title}</p>
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
  }, [data]);
  function addNewTodo(title) {
    setData((data) => [
      ...data,
      { id: data[data.length - 1]?.id + 1 || 1, title: title, isCheck: false },
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
