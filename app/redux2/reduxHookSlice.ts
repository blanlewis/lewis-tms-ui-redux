import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ReduxHookState from "./types";

const reduxHookInitialState: ReduxHookState = {
  buttonName: "",
  id: 0,
};

const reduxHookSlice = createSlice({
  name: "reduxHook",
  initialState: reduxHookInitialState,
  reducers: {
    setReduxHookState: (
      state,
      action: PayloadAction<Partial<ReduxHookState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default reduxHookSlice.reducer;

export const { setReduxHookState } = reduxHookSlice.actions;