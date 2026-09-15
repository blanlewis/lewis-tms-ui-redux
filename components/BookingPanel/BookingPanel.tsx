import { Box } from "@mui/material";
import CustomTabs from "@/components/CustomTabs";
import { useCustomHook } from "@/app/utils/hook";
import { BookingTabsDataEnum } from "@/app/utils/types";


const bookingTabsData = [
  { label: "All", value: BookingTabsDataEnum.ALL, content:<Box sx={{ border: '1px solid', borderColor: 'divider' }}></Box > },
  { label: "Suggested", value: BookingTabsDataEnum.SUGGESTED, content: <Box sx={{ border: '1px solid', borderColor: 'divider' }}></Box> },
];

const BookingPanel = () => {
  const { activeBookingTab, setActiveBookingTab } = useCustomHook();
  return (
    <Box sx={{ width: "100%" }}>
      <CustomTabs tabsData={bookingTabsData} value={activeBookingTab} setValue={setActiveBookingTab as (value: string) => void}/>
    </Box>
  );
};

export default BookingPanel;