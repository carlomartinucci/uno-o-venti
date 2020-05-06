import { createSlice } from "@reduxjs/toolkit";
import { wonEggForDay, wonChickenSinceDay } from "./helpers";

const eggAndChickenSlice = createSlice({
  name: "eggAndChicken",
  initialState: {
    month: 1,
    day: 1,
    history: [],
  },
  reducers: {
    egg: (state) => {
      return {
        month: state.month + 1,
        day: 1,
        history: [
          {
            month: state.month,
            day: state.day,
            won: wonEggForDay(state.day) + wonChickenSinceDay(state.day - 1),
          },
          ...state.history,
        ],
      };
    },
    chickenWin: (state) => {
      return {
        month: state.month,
        day: state.day + 1,
        history: state.history,
      };
    },
    chickenLose: (state) => {
      return {
        month: state.month + 1,
        day: 1,
        history: [
          {
            month: state.month,
            day: state.day,
            won: wonChickenSinceDay(state.day),
          },
          ...state.history,
        ],
      };
    },
  },
});

export const { egg, chickenWin, chickenLose } = eggAndChickenSlice.actions;

export default eggAndChickenSlice.reducer;
