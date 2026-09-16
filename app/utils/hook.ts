import { useContext } from "react";
import { CustomHookContext } from "./context";
import { CustomHookState, CustomHookActionEnum, SnackbarSeverityEnum, PageLayoutEnum,BookingTabsDataEnum } from "./types";
import { getLoginUserMutationApi,getCurrentUserApi, getLogoutMutationApi } from "./service";

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

    const logoutState = async () => {
        setIsLoadingState(true);
        try {
            const logoutResponse = await getLogoutMutationApi();
            if (!logoutResponse) {
                setCustomHookState({
                    loginId: "",
                });
                setPopper(null, null);
                setSnackbarState(
                    true,
                    "Logout successful",
                    SnackbarSeverityEnum.SUCCESS
                );
            }
            return logoutResponse;
        } catch (error) {
            console.error("Logout failed:", error);
            setSnackbarState(
                true,
                "Logout failed. Please try again.",
                SnackbarSeverityEnum.ERROR
            );
            throw error;
        } finally {
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

    const setPopper = (anchorElForPopper: HTMLElement | null, popperContent: React.ReactNode | null) => {
        setCustomHookState({
            popper: {
                anchorElForPopper,
                popperContent,
            },
        });
    };

    const setSelectedBookings = (selectedBookings: number[]) => {
        setCustomHookState({
            selectedBookings,
        });
    };

    const setAnalyseOnMapBookingId = (bookingId: number | null, source: { lat: number | null; long: number | null }, destination: { lat: number | null; long: number | null }) => {
        setCustomHookState({
            analyseOnMapBookingId: {
                bookingId,
                source,
                destination,
            },
        });
    };

    return {
        ...state,
        setCustomHookState,
        loginState,
        getCurrentUser,
        logoutState,
        setIsLoadingState,
        setSnackbarState,
        setPageLayout,
        setActiveBookingTab,
        setPopper,
        setSelectedBookings,
        setAnalyseOnMapBookingId,
    };
};

export { useCustomHook };
