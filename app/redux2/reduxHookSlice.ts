import { createSlice } from "@reduxjs/toolkit";

const reduxHookSlice = createSlice({
    name: "reduxHook",
    initialState: {
        buttonName: "",
    },
    reducers: {
        setReduxHookState: (state, action) => {
            state.buttonName = action.payload;
        }
    },
});

export default reduxHookSlice.reducer;
export const { setReduxHookState } = reduxHookSlice.actions;