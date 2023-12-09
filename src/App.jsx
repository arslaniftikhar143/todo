/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
} from "./features/todo/todoSlice";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todoList);
  console.log(todos);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return alert("Please fill the details first");
    dispatch(
      addTodo({
        title: input,
      })
    );
    setInput("");
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center pt-8 ">
      <h1 className="text-3xl text-white">Todos</h1>
      <form className="mt-4 flex justify-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded-lg border-none p-2 outline-none"
        />
        <button
          className="ml-2 rounded-lg bg-green-500 px-4 py-2 text-white"
          onClick={handleSubmit}
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="w-1/2">
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default App;

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  console.log(editText);
  return (
    <div className="mt-4 flex w-full items-center justify-between rounded-lg bg-white p-2 hover:shadow-lg">
      <h1 className={`text-xl ${todo.completed ? "strike text-gray-400" : ""}`}>
        {edit ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
            autoFocus
            className=" border-none outline-none"
          />
        ) : (
          todo.title
        )}
      </h1>
      <div className="mt-2 flex">
        {edit ? (
          <button
            name="Save todo"
            className="mr-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-600"
            onClick={() => {
              dispatch(
                updateTodo({
                  id: todo.id,
                  updatedTitle: editText,
                })
              );
              setEdit(!edit);
            }}
          >
            Save
          </button>
        ) : (
          <button
            name="Edit todo"
            disabled={todo.completed}
            className={`mr-2 rounded-lg bg-blue-500 p-2 text-white transition-all duration-300 hover:bg-blue-600 ${
              todo.completed ? "cursor-not-allowed bg-gray-500" : ""
            }`}
            onClick={() => setEdit(!edit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114Zm9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13l.887-.887Z"
              ></path>
            </svg>
          </button>
        )}

        <button
          title="Mark as completed"
          className="mr-2 rounded-lg bg-green-500 p-2 text-white transition-all duration-300 hover:bg-green-600"
          onClick={() => {
            dispatch(
              toggleTodo({
                id: todo.id,
              })
            );
          }}
        >
          {!todo.completed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.3 7.61l-4.57 6a1 1 0 0 1-.79.39a1 1 0 0 1-.79-.38l-2.44-3.11a1 1 0 0 1 1.58-1.23l1.63 2.08l3.78-5a1 1 0 1 1 1.6 1.22Z"
              ></path>
            </svg>
          ) : (
            <svg
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
              focusable="false"
              aria-hidden="true"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              fill="currentColor"
              data-testid="CancelIcon"
              tabindex="-1"
              title="Cancel"
            >
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
            </svg>
          )}
        </button>
        <button
          name="Delete todo"
          className="rounded-lg bg-red-500 p-2 text-white transition-all duration-300 hover:bg-red-600"
          onClick={() => {
            dispatch(
              removeTodo({
                id: todo.id,
              })
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="component-iconify MuiBox-root css-1t9pz9x iconify iconify--solar"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877Z"
            ></path>
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886Zm-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.043.713-.43.672-.864l-.5-5.263Zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.043-.713-.43-.672-.864l.5-5.263c.04-.434.409-.75.82-.707Z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
