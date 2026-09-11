"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useCustomHook } from "./utils/hook";
import {  Box, CircularProgress } from '@mui/material';

export default function Home() {
    const {
        loginId,
        isSessionChecked,
        getCurrentUser,
    } = useCustomHook();

    useEffect(() => {
        getCurrentUser();
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
        redirect("/login");
    }

    return <div>Welcome {loginId}</div>;
}