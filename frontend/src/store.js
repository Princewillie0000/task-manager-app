import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer,
  },
});

store.subscribe(() => {
  const { userTasks } = store.getState().task;
  localStorage.setItem("tasks", JSON.stringify(userTasks));
});

export default store;
