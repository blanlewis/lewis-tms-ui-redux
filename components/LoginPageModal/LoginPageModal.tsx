"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import CustomModal from "@/components/CustomModal";
import CustomTextField from "@/components/CustomTextField";
import CustomButton from "@/components/CustomButton";

const LoginPageModal = () => {
    const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            isLogin(
              loginId: "${loginId}"
              password: "${password}"
            )
          }
        `,
      }),
    });

    const data = await response.json();

    console.log("Login response:", data);
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