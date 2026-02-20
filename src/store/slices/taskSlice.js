import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      completed: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      completed: false,
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description 3",
      completed: true,
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const taskWithId = {
        ...action.payload,
        id: Date.now(),
        completed: false,
      };

      state.tasks.push(taskWithId);
    },

    toggleTaskComplete: (state, action) => {
      const task = state.task.find((task) => task.id == action.payload);
      if (task) task.completed = !task.completed;
    },

    editTask: (state, action) => {
      const { taskId, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id == taskId);

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[index], ...updatedTask };
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, toggleTaskComplete, editTask, deleteTask } =
  taskSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;

export const selectPendingTasks = (state) =>
  state.tasks.tasks.filter((task) => !task.completed);

export const selectCompletedTasks = (state) =>
  state.tasks.tasks.filter((task) => task.completed);

export default taskSlice.reducer;
