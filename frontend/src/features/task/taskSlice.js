import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const taskSlice = createSlice({
  name: "task",

  initialState: {
    userTasks: (() => {
      const tasksFromStorage = localStorage.getItem("tasks");
      if (tasksFromStorage && tasksFromStorage.length > 0) {
        // add a try and catch block to be absolutely sure
        try {
          return JSON.parse(tasksFromStorage);
        } catch (e) {
          console.error("Error parsing tasks from localStorage:", e.message);
          // here you fall back to an empty array on any error
          return [];
        }
      }
      return [];
    })(),
  },

  reducers: {
    addNewTask: (state, action) => {
      const date = new Date();
      console.log("addNewTask reducer called. Payload:", action.payload);

      const newTask = {
        task_id: uuidv4(),
        // task_id: Math.floor(Math.random() * 9999),
        task_content: action.payload,
        task_createdAt: date.toDateString(),
        taskStatus: "ongoing",
      };
      state.userTasks = [newTask, ...state.userTasks];
      console.log("task NAME:", state.userTasks[0].task_content);
      console.log("UUID4 QUICK TEST: ", uuidv4());

      localStorage.setItem("tasks", JSON.stringify(state.userTasks));
    },
    /******* ********/

    /*** Action for deleting a task */
    deleteTask: (state, action) => {
      console.log("deleteTask reducer called. Payload:", action.payload);

      console.log(
        "Task ID from state:",
        typeof state.userTasks[0]?.task_id,
        state.userTasks[0]?.task_id
      );
      console.log("Action Payload:", typeof action.payload, action.payload);

      const updatedTask = state.userTasks.filter(
        (item) => item.task_id !== action.payload
      );

      console.log("Updated Task Count:", updatedTask.length);

      state.userTasks = updatedTask;
      localStorage.setItem("tasks", JSON.stringify(state.userTasks));
    },
    /******* ********/

    /*** Action for updating a task*/
    updateTask: (state, action) => {
      const { task_id, update_task_content } = action.payload;

      const task = state.userTasks.find((item) => item.task_id === task_id);
      if (task) {
        task.task_content = update_task_content; // direct update
      }
      localStorage.setItem("tasks", JSON.stringify(state.userTasks)); // Save updated tasks to localStorage
      // console.log("Updated task content:", task.task_content);
      // console.log("Redux state after update:", state.userTasks);
    },

    setUserTasks: (state, action) => {
      console.log("setUserTasks reducer called. Payload:", action.payload);

      state.userTasks = action.payload;
      console.log("Redux state after set", state.userTasks);
    },
  },
});

export const { addNewTask, deleteTask, updateTask, setUserTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
