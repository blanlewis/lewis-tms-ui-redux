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
    snackbar: {
        open: boolean;
        message: string;
        severity: SnackbarSeverityEnum;
    };
}

enum SnackbarSeverityEnum {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}

const customHookInitialState = {
    loginId: "",
    isLoading: false,
    isSessionChecked: false,
    snackbar:{
        open: false,
        message: "",
        severity: SnackbarSeverityEnum.INFO
    }
};

export type { CustomHookState, CustomHookAction,LoginResponse };
export { customHookInitialState, CustomHookActionEnum, SnackbarSeverityEnum };