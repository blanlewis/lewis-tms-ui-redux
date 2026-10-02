import { configureStore } from '@reduxjs/toolkit';
import reduxHookReducer from "./reduxHookSlice";
const store = configureStore({
  reducer: {
    reduxHook: reduxHookReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;