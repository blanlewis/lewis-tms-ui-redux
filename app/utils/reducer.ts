import { CustomHookState, CustomHookAction, CustomHookActionEnum } from "./types";

const customHookReducer = (state: CustomHookState, action: CustomHookAction): CustomHookState => {
    switch (action.type) {
        case CustomHookActionEnum.SET_CUSTOM_HOOK_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export { customHookReducer };
