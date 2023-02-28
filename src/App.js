import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
let DATA = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur",
  },
];
function ListTodos({ title, id, deleteTodo }) {
  const [isCheck, setIsCheck] = React.useState(false);
  return (
    <div className="flex justify-between items-center py-3 border-b">
      <div className="flex gap-10 items-center">
        <input type="checkbox" onClick={() => setIsCheck(!isCheck)} />
        {isCheck ? <p className="line-through">{title}</p> : <p>{title}</p>}
      </div>
      <button className="text-red-600" onClick={() => deleteTodo(id)}>
        <FontAwesomeIcon icon={faDeleteLeft} />
      </button>
    </div>
  );
}

export default function Todos() {
  const [data, setData] = React.useState(DATA);
  const [inputValue, setInputValue] = React.useState();
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
            value={inputValue || ""}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="add Todos"
            className="w-full outline-none"
          />
          <button
            type="submit"
            onClick={() => {
              if (inputValue) {
                addNewTodo(inputValue);
              }
            }}
          >
            Add
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
