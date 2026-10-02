import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxHookState, SnackbarSeverityEnum, PageLayoutEnum, PageLayoutPaneEnum, BookingTabsDataEnum, BookingTypes } from "./types";

const reduxHookInitialState: ReduxHookState = {
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
    },
    activeBookingTab: BookingTabsDataEnum.ALL,
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
    bookings: {
        bookingsList: [],
        pageInfo: {
            hasNextPage: false,
            startCursor: null,
            endCursor: null,
        },
    },
};

const reduxHookSlice = createSlice({
  name: "reduxHook",
  initialState: reduxHookInitialState,
  reducers: {
    setReduxHookState: (
      state,
      action: PayloadAction<Partial<ReduxHookState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default reduxHookSlice.reducer;
export const { setReduxHookState } = reduxHookSlice.actions;