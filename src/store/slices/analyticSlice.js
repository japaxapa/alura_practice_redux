import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  overdueTasks: 0,
  completionPercentage: 0,
};

function formatDate(date) {
  const dateArr = date.split("/");
  const newDateArr = [];
  newDateArr.push(dateArr[1]);
  newDateArr.push(dateArr[0]);
  newDateArr.push(dateArr[2]);

  return newDateArr.join("/");
}

const analyticSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    updateAnalytics: (state, action) => {
      const tasks = action.payload;
      const currentDate = new Date();
      currentDate.setHours(23, 59, 59, 999);

      state.totalTasks = tasks.length;
      state.completedTasks = tasks.filter((task) => task.completed).length;
      state.pendingTasks = tasks.filter((task) => !task.completed).length;
      state.overdueTasks = tasks.filter((task) => {
        if (task.completed || !task.date) return false;

        const date = formatDate(task.date);
        const taskDate = new Date(date);

        return taskDate < currentDate;
      }).length;
      state.completionPercentage =
        state.totalTasks > 0
          ? Math.round((state.completedTasks / state.totalTasks) * 100)
          : 0;
    },
  },
});

export const { updateAnalytics } = analyticSlice.actions;

export const selectAnalytics = (state) => state.analytics;

export default analyticSlice.reducer;
