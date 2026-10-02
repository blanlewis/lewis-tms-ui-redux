import { AppDispatch } from "./store";
import { setReduxHookState } from "./reduxHookSlice";
import {
    SnackbarSeverityEnum,
} from "./types";
import {
    getLoginUserMutationApi,
    getCurrentUserApi,
    getLogoutMutationApi,
    getBookingsApi,
} from "@/app/utils/service";

const loginState = async (
    dispatch: AppDispatch,
    loginId: string,
    password: string
) => {
    dispatch(
        setReduxHookState({
            isLoading: true,
        })
    );
    try {
        const loginResponse = await getLoginUserMutationApi(
            loginId,
            password
        );
        if (loginResponse?.success) {
            const storedDataInLocalStorage = localStorage.getItem(
                `localStorage_${loginResponse.loginId}`
            );
            const parsedStoredDataInLocalStorage =
                storedDataInLocalStorage
                    ? JSON.parse(storedDataInLocalStorage)
                    : null;
            dispatch(
                setReduxHookState({
                    loginId: loginResponse.loginId,
                    ...(parsedStoredDataInLocalStorage?.pageLayout
                        ? {
                              pageLayout:
                                  parsedStoredDataInLocalStorage.pageLayout,
                          }
                        : {}),
                })
            );
            dispatch(
                setReduxHookState({
                    snackbar: {
                        open: true,
                        message: "Login successful",
                        severity: SnackbarSeverityEnum.SUCCESS,
                    },
                })
            );
        } else {
            dispatch(
                setReduxHookState({
                    snackbar: {
                        open: true,
                        message: "Login failed: Invalid credentials",
                        severity: SnackbarSeverityEnum.ERROR,
                    },
                })
            );
        }
        return loginResponse;
    } catch (error) {
        dispatch(
            setReduxHookState({
                snackbar: {
                    open: true,
                    message: "Login failed. Please try again.",
                    severity: SnackbarSeverityEnum.ERROR,
                },
            })
        );
        console.error("Login failed:", error);
        throw error;
    } finally {
        dispatch(
            setReduxHookState({
                isLoading: false,
            })
        );
    }
};


const getCurrentUser = async (dispatch: AppDispatch) => {
    dispatch(
        setReduxHookState({
            isLoading: true,
        })
    );
    try {
        const currentUser = await getCurrentUserApi();
        if (currentUser) {
            const storedDataInLocalStorage = localStorage.getItem(
                `localStorage_${currentUser}`
            );
            const parsedStoredDataInLocalStorage =
                storedDataInLocalStorage
                    ? JSON.parse(storedDataInLocalStorage)
                    : null;
            dispatch(
                setReduxHookState({
                    loginId: currentUser,
                    ...(parsedStoredDataInLocalStorage?.pageLayout
                        ? {
                              pageLayout:
                                  parsedStoredDataInLocalStorage.pageLayout,
                          }
                        : {}),
                })
            );
        }
        return currentUser;
    } catch (error) {
        console.error("Failed to get current user:", error);
        throw error;
    } finally {
        dispatch(
            setReduxHookState({
                isSessionChecked: true,
                isLoading: false,
            })
        );
    }
};


const logoutState = async (dispatch: AppDispatch) => {
    dispatch(
        setReduxHookState({
            isLoading: true,
        })
    );
    try {
        const logoutResponse = await getLogoutMutationApi();
        if (!logoutResponse) {
            dispatch(
                setReduxHookState({
                    loginId: "",
                })
            );
            dispatch(
                setReduxHookState({
                    snackbar: {
                        open: true,
                        message: "Logout successful",
                        severity: SnackbarSeverityEnum.SUCCESS,
                    },
                })
            );
        }
        return logoutResponse;
    } catch (error) {
        console.error("Logout failed:", error);
        dispatch(
            setReduxHookState({
                snackbar: {
                    open: true,
                    message: "Logout failed. Please try again.",
                    severity: SnackbarSeverityEnum.ERROR,
                },
            })
        );
        throw error;
    } finally {
        dispatch(
            setReduxHookState({
                isLoading: false,
            })
        );
    }
};


const fetchBookings = async (
    dispatch: AppDispatch,
    first: number,
    after: string | null
) => {
    try {
        const bookingsResponse = await getBookingsApi(first, after);
        dispatch(
            setReduxHookState({
                bookings: {
                    bookingsList: bookingsResponse.bookingsList,
                    pageInfo: bookingsResponse.pageInfo,
                },
            })
        );
        return bookingsResponse;
    } catch (error) {
        console.error("Failed to fetch bookings:", error);
        throw error;
    }
};

export {
    loginState,
    getCurrentUser,
    logoutState,
    fetchBookings,
};