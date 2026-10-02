"use client";

import * as React from "react";
import {
  Snackbar,
  SnackbarCloseReason,
  Alert,
  AlertColor,
  Slide,
  SlideProps,
} from "@mui/material";

import { SnackbarSeverityEnum } from "@/app/utils/redux2/types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/utils/redux2/store";
import { setReduxHookState } from "@/app/utils/redux2/reduxHookSlice";

function SlideTransition(props: Readonly<SlideProps>) {
  return (
    <Slide
      {...props}
      direction="left"
      timeout={{ enter: 300, exit: 0 }}
    />
  );
}

export default function CustomSnackbar() {
  const snackbar = useSelector(
    (state: RootState) => state.reduxHook.snackbar
  );

  const dispatch = useDispatch<AppDispatch>();

  const setSnackbarState = (
    open: boolean,
    message: string,
    severity: SnackbarSeverityEnum
  ) => {
    dispatch(
      setReduxHookState({
        snackbar: {
          open,
          message,
          severity,
        },
      })
    );
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState(
      false,
      snackbar.message,
      snackbar.severity
    );
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      slots={{ transition: SlideTransition }}
    >
      <Alert
        onClose={handleClose}
        severity={(snackbar.severity as AlertColor) || "info"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}