import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

const increment = createAction("counter/increment");
const decrement = createAction("counter/decrement");
const incrementByAmount = createAction<number>("counter/incrementByAmount");

const initialState = { value: 0 };

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.value++;
    })
    .addCase(decrement, (state) => {
      state.value--;
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload;
    });
});

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(increment());
