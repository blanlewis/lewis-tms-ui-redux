import Box from '@mui/material/Box';
import CustomAvatar from "@/components/CustomAvatar";
import CustomButton from "@/components/CustomButton";
import { useCustomHook } from "@/app/utils/customHook/hook";

const ProfilePopup = ({ toolbarAvatar }: { toolbarAvatar: string }) => {
  const { logoutState } = useCustomHook();

  const handleLogout = async () => {
      await logoutState();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, p: 1 }}>
      <CustomAvatar toolbarAvatar={toolbarAvatar} />
    <CustomButton
      buttonText="Logout"
      buttonTextOrIconColor="#FFFFFF"
      icon={null}
      isButtonDisabled={false}
      onButtonClicked={handleLogout}
      buttonMinWidth="100px"
      buttonHeight="36px"
      buttonFontSize="14px"
      buttonBackgroundColor="#1976d2"
      buttonBorderColor="#1976d2"
      buttonBoxShadow="none"
      buttonPadding="6px 16px"
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
  );
};

export default ProfilePopup;