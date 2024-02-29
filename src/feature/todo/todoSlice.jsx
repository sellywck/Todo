import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getInitialTodo = () => {
  const TodoListHistory = window.localStorage.getItem("todoList");
  if (TodoListHistory) {
    return JSON.parse(TodoListHistory);
  }
  window.localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};
const initialValue = {
  filterStatus: "all",
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");

      //if todolist is not empty
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({ ...action.payload });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      //if todolist is not empty
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        const updatedTodoList = todoListArr.filter(
          (todo) => todo.id !== action.payload
        );
        window.localStorage.setItem(
          "todoList",
          JSON.stringify(updatedTodoList)
        );
        state.todoList = updatedTodoList;
        toast.success("Todo deleted successfully", {
          autoClose: 1000,
          position: "bottom-right",
        });
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      //if todolist is not empty
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.description = action.payload.description;
            todo.completed = action.payload.completed;
            todo.selectedDate = action.payload.selectedDate;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
        toast.success("Todo updated successfully", {
          autoClose: 1000,
          position: "bottom-right",
        });
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
