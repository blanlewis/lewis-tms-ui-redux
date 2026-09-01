"use client";
import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { CustomHookState, CustomHookAction } from "./types";
import { customHookInitialState } from "./types";
import { customHookReducer } from "./reducer";

interface CustomHookContextValue {
    state: CustomHookState;
    dispatch: Dispatch<CustomHookAction>;
}

const CustomHookContext = createContext<CustomHookContextValue | null>(null);

const CustomHookProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(customHookReducer, customHookInitialState);

    return (
        <CustomHookContext.Provider value={{ state, dispatch }}>
            {children}
        </CustomHookContext.Provider>
    );
};

export { CustomHookContext, CustomHookProvider };
