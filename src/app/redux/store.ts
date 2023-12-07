import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./grid.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      grid: gridReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
