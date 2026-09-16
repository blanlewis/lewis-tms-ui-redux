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
    pageLayout: PageLayoutEnum;
    activeBookingTab: BookingTabsDataEnum;
    popper: {
        anchorElForPopper: HTMLElement | null;
        popperContent: React.ReactNode | null;
    };
    selectedBookings: number[];
    analyseOnMapBookingId: number | null;
}

enum PageLayoutEnum {
    TWO_PANEL_LAYOUT = "2 panel layout",
    THREE_PANEL_LAYOUT = "3 panel layout",
    CLASSIC = "classic",
}

enum SnackbarSeverityEnum {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}

enum BookingTabsDataEnum {
    ALL = "all",
    SUGGESTED = "suggested",
}

type BookingTypes = {
  id: number;
  source: string;
  destination: string;
  sourceLatitude: number;
  sourceLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
};

const customHookInitialState = {
    loginId: "",
    isLoading: false,
    isSessionChecked: false,
    snackbar:{
        open: false,
        message: "",
        severity: SnackbarSeverityEnum.INFO
    },
    pageLayout: PageLayoutEnum.TWO_PANEL_LAYOUT,
    activeBookingTab: BookingTabsDataEnum.ALL,
    popper: {
        anchorElForPopper: null,
        popperContent: null,
    },
    selectedBookings: [],
    analyseOnMapBookingId: null,
};

export type { CustomHookState, CustomHookAction,LoginResponse, BookingTypes };
export { customHookInitialState, CustomHookActionEnum, SnackbarSeverityEnum, PageLayoutEnum, BookingTabsDataEnum };