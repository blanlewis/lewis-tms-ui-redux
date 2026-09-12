"use client";
import { createContext, useReducer, useMemo, ReactNode, Dispatch } from "react";
import { CustomHookState, CustomHookAction, customHookInitialState } from "./types";
import { customHookReducer } from "./reducer";

interface CustomHookContextValue {
    state: CustomHookState;
    dispatch: Dispatch<CustomHookAction>;
}

const CustomHookContext = createContext<CustomHookContextValue | null>(null);

const CustomHookProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(customHookReducer, customHookInitialState);
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <CustomHookContext.Provider value={value}>
            {children}
        </CustomHookContext.Provider>
    );
};

export { CustomHookContext, CustomHookProvider };
