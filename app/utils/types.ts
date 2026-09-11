interface LoginResponse {
    success: boolean;
    loginId: string;
}
enum CustomHookActionEnum {
    SET_CUSTOM_HOOK_DATA = "SET_CUSTOM_HOOK_DATA",
}
type CustomHookAction =
    { type: CustomHookActionEnum.SET_CUSTOM_HOOK_DATA; payload: Partial<CustomHookState> };

interface CustomHookState {
    loginId: string;
    isLoading: boolean;
    isSessionChecked: boolean;
}

const customHookInitialState = {
    loginId: "",
    isLoading: false,
    isSessionChecked: false,
};

export type { CustomHookState, CustomHookAction,LoginResponse };
export { customHookInitialState, CustomHookActionEnum };