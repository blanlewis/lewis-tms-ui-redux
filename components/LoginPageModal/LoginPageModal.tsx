"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import CustomModal from "@/components/CustomModal";
import CustomTextField from "@/components/CustomTextField";
import CustomButton from "@/components/CustomButton";
import { useCustomHook } from "@/app/utils/hook";

const LoginPageModal = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const { loginState } = useCustomHook();

  const handleLogin = async () => {
    const isLoggedIn = await loginState(loginId, password);
    console.log("Login response:", isLoggedIn);
  };

  return (
    <CustomModal
      open={true}
      onClose={() => {}}
      modalContent={
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}>
          <Image
            src="/icon.jpg"
            alt="Logo"
            width={100}
            height={100}
          />
          <CustomTextField
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            label="Login ID"
           />
          <CustomTextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
          />
          <CustomButton
            buttonText="Login"
            buttonTextOrIconColor="#FFFFFF"
            icon={null}
            isButtonDisabled={false}
            onButtonClicked={handleLogin}
            buttonMinWidth="100%"
            buttonHeight="40px"
            buttonFontSize="16px"
            buttonBackgroundColor="#1976d2"
            buttonBorderColor="#1976d2"
            buttonBoxShadow="none"
            buttonPadding="8px 16px"
            buttonBorderRadius="4px"
            buttonHoverTextOrIconColor="#FFFFFF"
            buttonHoverBackgroundColor="#1565c0"
            buttonHoverBoxShadow="none"
            buttonHoverBorderColor="#1565c0"
            buttonDisabledBackgroundColor="#E0E0E0"
            buttonDisabledTextColor="#9E9E9E"
            buttonDisabledBorderColor="#E0E0E0"
            buttonDisabledBoxShadow="none"
          />
        </Box>
      }
    />
  );
};

export default LoginPageModal;