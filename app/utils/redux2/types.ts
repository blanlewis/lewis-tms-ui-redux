enum SnackbarSeverityEnum {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}

interface LoginResponse {
    success: boolean;
    loginId: string;
}

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

interface ReduxHookState {
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
    bookings: {
        bookingsList: BookingTypes[];
        pageInfo: {
            hasNextPage: boolean;
            startCursor: string | null;
            endCursor: string | null;
        };
    };
}

export { SnackbarSeverityEnum, PageLayoutEnum, PageLayoutPaneEnum, BookingTabsDataEnum };
export type { LoginResponse };

export type { BookingTypes, ReduxHookState };