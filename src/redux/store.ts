import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

store.subscribe(() => {
  console.log("store change: ", store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
