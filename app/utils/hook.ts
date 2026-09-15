import { useContext } from "react";
import { CustomHookContext } from "./context";
import { CustomHookState, CustomHookActionEnum, SnackbarSeverityEnum, PageLayoutEnum,BookingTabsDataEnum } from "./types";
import { getLoginUserMutationApi,getCurrentUserApi } from "./service";

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
        setIsLoadingState(true);
        try {
            const loginResponse =
                await getLoginUserMutationApi(loginId, password);
            if (loginResponse?.success) {
                setCustomHookState({
                    loginId: loginResponse.loginId,
                });
                setSnackbarState(true, "Login successful", SnackbarSeverityEnum.SUCCESS);
            } else {
                setSnackbarState(true, "Login failed: Invalid credentials", SnackbarSeverityEnum.ERROR);
            }
            return loginResponse;
        } catch (error) {
            setSnackbarState(true, "Login failed. Please try again.", SnackbarSeverityEnum.ERROR);
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoadingState(false);
        }
    };

    const getCurrentUser = async () => {
        setIsLoadingState(true);
        try {
            const currentUser = await getCurrentUserApi();
            if (currentUser) {
                setCustomHookState({
                    loginId: currentUser,
                });
            }
            return currentUser;
        } catch (error) {
            console.error("Failed to get current user:", error);
            throw error;
        } finally {
            setCustomHookState({
                isSessionChecked: true,
            });
            setIsLoadingState(false);
        }
    };

    const setIsLoadingState = (isLoading: boolean) => {
        setCustomHookState({
            isLoading,
        });
    };

    const setSnackbarState = (open: boolean, message: string, severity: SnackbarSeverityEnum) => {
        setCustomHookState({
            snackbar: {
                open,
                message,
                severity,
            },
        });
    };

    const setPageLayout = (layout: PageLayoutEnum) => {
        setCustomHookState({
            pageLayout: layout,
        });
    };

    const setActiveBookingTab = (tab: BookingTabsDataEnum) => {
        setCustomHookState({
            activeBookingTab: tab,
        });
    };

    const setAnchorElForPopper = (anchorEl: HTMLElement | null) => {
        setCustomHookState({
            anchorElForPopper: anchorEl,
        });
    };

    return {
        ...state,
        setCustomHookState,
        loginState,
        getCurrentUser,
        setIsLoadingState,
        setSnackbarState,
        setPageLayout,
        setActiveBookingTab,
        setAnchorElForPopper,
    };
};

export { useCustomHook };
