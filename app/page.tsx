"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { RootState } from "@/app/utils/redux2/store";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/app/utils/redux2/functions";
import {  Box, CircularProgress } from '@mui/material';
import MyReactConceptLayout from "@/components/MyReactConceptLayout/MyReactConceptLayout";

export default function Home() {
    const dispatch = useDispatch();
    const isSessionChecked = useSelector((state: RootState) => state.reduxHook.isSessionChecked);
    const loginId = useSelector((state: RootState) => state.reduxHook.loginId);

    useEffect(() => {
        getCurrentUser(dispatch);
    }, []);

    if (!isSessionChecked) {
      return (
          <Box sx={{ display: 'flex',
              width: '100%',
              height: '100vh',
              alignItems: 'center',
              justifyContent: 'center',
          }}>
              <CircularProgress aria-label="Loading…" sx={{ width: '100px !important', height: '100px !important', color:"limegreen" }} />
          </Box>
      );
    }

    const isLoggedIn = Boolean(loginId);
    if (!isLoggedIn) {
        redirect("/loginPage");
    }

    return <MyReactConceptLayout />;
}