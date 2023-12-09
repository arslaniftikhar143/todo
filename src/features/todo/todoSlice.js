import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: "tods",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push({
        id: nanoid(),
        title: action.payload.title,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todoList.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
    updateTodo: (state, action) => {
      const todo = state.todoList.find((todo) => todo.id === action.payload.id);
      todo.title = action.payload.updatedTitle;
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
