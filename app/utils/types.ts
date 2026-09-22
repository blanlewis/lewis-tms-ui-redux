interface LoginResponse {
    success: boolean;
    loginId: string;
}

enum CustomHookActionEnum {
    SET_CUSTOM_HOOK_DATA = "SET_CUSTOM_HOOK_DATA",
    SET_PAGE_LAYOUT = "SET_PAGE_LAYOUT",
}

interface CustomHookState {
    loginId: string;
    isLoading: boolean;
    isSessionChecked: boolean;

    snackbar: {
        open: boolean;
        message: string;
        severity: SnackbarSeverityEnum;
    };

    pageLayout: {
        layout: PageLayoutEnum;
        pane1: PageLayoutPaneEnum;
        pane2: PageLayoutPaneEnum;
        pane3: PageLayoutPaneEnum;
    };

    activeBookingTab: BookingTabsDataEnum;

    popper: {
        anchorElForPopper: HTMLElement | null;
        popperContent: React.ReactNode | null;
        popperPlacement: "top" | "bottom" | "left" | "right";
    };

    selectedBookings: number[];

    analyseOnMapBookingId: {
        bookingId: number | null;
        source: {
            lat: number | null;
            long: number | null;
        };
        destination: {
            lat: number | null;
            long: number | null;
        };
    };
}

type CustomHookAction =
    | {
        type: CustomHookActionEnum.SET_CUSTOM_HOOK_DATA;
        payload: Partial<CustomHookState>;
    }
    | {
        type: CustomHookActionEnum.SET_PAGE_LAYOUT;
        payload: Partial<CustomHookState["pageLayout"]>;
    };

enum PageLayoutEnum {
    TWO_PANEL_LAYOUT = "2 panel layout",
    THREE_PANEL_LAYOUT = "3 panel layout",
    CLASSIC = "classic",
}

enum PageLayoutPaneEnum {
    DOSSIER_PANE = "dossier pane",
    MAP_PANE = "map pane",
    BOOKING_PANE = "booking pane",
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
const storedPageLayout =
    typeof window !== "undefined"
        ? window.localStorage.getItem("pageLayout")
        : null;
console.log(storedPageLayout);
const parsedStoredPageLayout = storedPageLayout ? JSON.parse(storedPageLayout) : null;
console.log(parsedStoredPageLayout);
const customHookInitialState: CustomHookState = {
    loginId: "",
    isLoading: false,
    isSessionChecked: false,
    snackbar: {
        open: false,
        message: "",
        severity: SnackbarSeverityEnum.INFO,
    },
    pageLayout: {
        layout: PageLayoutEnum.TWO_PANEL_LAYOUT,
        pane1: PageLayoutPaneEnum.DOSSIER_PANE,
        pane2: PageLayoutPaneEnum.MAP_PANE,
        pane3: PageLayoutPaneEnum.BOOKING_PANE,
        ...parsedStoredPageLayout,
    },
    activeBookingTab: BookingTabsDataEnum.ALL,
    popper: {
        anchorElForPopper: null,
        popperContent: null,
        popperPlacement: "bottom",
    },
    selectedBookings: [],
    analyseOnMapBookingId: {
        bookingId: null,
        source: {
            lat: null,
            long: null,
        },
        destination: {
            lat: null,
            long: null,
        },
    },
};

export type {
    CustomHookState,
    CustomHookAction,
    LoginResponse,
    BookingTypes,
};

export {
    customHookInitialState,
    CustomHookActionEnum,
    SnackbarSeverityEnum,
    PageLayoutEnum,
    PageLayoutPaneEnum,
    BookingTabsDataEnum,
};