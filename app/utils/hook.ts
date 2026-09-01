import { useContext } from "react";
import { CustomHookContext } from "./context";
import { CustomHookState, CustomHookActionEnum } from "./types";
import { getLoginUserMutationApi } from "./service";

const useCustomHook = () => {
    const context = useContext(CustomHookContext);
    if (!context) {
        throw new Error("useCustomHook must be used within a CustomHookProvider");
    }
    const { state, dispatch } = context;

    const setCustomHookState = (customHookState: Partial<CustomHookState>) => {
        dispatch({ type: CustomHookActionEnum.SET_CUSTOM_HOOK_DATA, payload: customHookState });
    };

    const loginState = async (loginId: string, password: string) => {

        const loginResponse =
            await getLoginUserMutationApi(loginId, password);

        if (loginResponse.success) {
            setCustomHookState({
                loginId: loginResponse.loginId
            });
        }

        return loginResponse;
    };

    return {
        ...state,
        setCustomHookState,
        loginState,
    };
};

export { useCustomHook };
