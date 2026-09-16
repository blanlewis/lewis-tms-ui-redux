import { Box } from "@mui/material";
import CustomTabs from "@/components/CustomTabs";
import { useCustomHook } from "@/app/utils/hook";
import { BookingTabsDataEnum } from "@/app/utils/types";
import CustomCardWithCheckbox from "@/components/BookingCardWithCheckBox";

const bookingData = [
  {
    id: 1,
    source: "Udupi",
    destination: "Mangalore",
    sourceLatitude: 13.3409,
    sourceLongitude: 74.7421,
    destinationLatitude: 12.9141,
    destinationLongitude: 74.8560,
  },
  {
    id: 2,
    source: "Mangalore",
    destination: "Kundapura",
    sourceLatitude: 12.9141,
    sourceLongitude: 74.8560,
    destinationLatitude: 13.6290,
    destinationLongitude: 74.6900,
  },
  {
    id: 3,
    source: "Kundapura",
    destination: "Malpe",
    sourceLatitude: 13.6290,
    sourceLongitude: 74.6900,
    destinationLatitude: 13.3498,
    destinationLongitude: 74.7039,
  },
  {
    id: 4,
    source: "Malpe",
    destination: "Puttur",
    sourceLatitude: 13.3498,
    sourceLongitude: 74.7039,
    destinationLatitude: 12.7598,
    destinationLongitude: 75.2017,
  },
  {
    id: 5,
    source: "Puttur",
    destination: "Udupi",
    sourceLatitude: 12.7598,
    sourceLongitude: 75.2017,
    destinationLatitude: 13.3409,
    destinationLongitude: 74.7421,
  },
  {
    id: 6,
    source: "Udupi",
    destination: "Kundapura",
    sourceLatitude: 13.3409,
    sourceLongitude: 74.7421,
    destinationLatitude: 13.6290,
    destinationLongitude: 74.6900,
  },
  {
    id: 7,
    source: "Kundapura",
    destination: "Mangalore",
    sourceLatitude: 13.6290,
    sourceLongitude: 74.6900,
    destinationLatitude: 12.9141,
    destinationLongitude: 74.8560,
  },
  {
    id: 8,
    source: "Mangalore",
    destination: "Puttur",
    sourceLatitude: 12.9141,
    sourceLongitude: 74.8560,
    destinationLatitude: 12.7598,
    destinationLongitude: 75.2017,
  },
  {
    id: 9,
    source: "Puttur",
    destination: "Kundapura",
    sourceLatitude: 12.7598,
    sourceLongitude: 75.2017,
    destinationLatitude: 13.6290,
    destinationLongitude: 74.6900,
  },
  {
    id: 10,
    source: "Kundapura",
    destination: "Udupi",
    sourceLatitude: 13.6290,
    sourceLongitude: 74.6900,
    destinationLatitude: 13.3409,
    destinationLongitude: 74.7421,
  },
  {
    id: 11,
    source: "Udupi",
    destination: "Malpe",
    sourceLatitude: 13.3409,
    sourceLongitude: 74.7421,
    destinationLatitude: 13.3498,
    destinationLongitude: 74.7039,
  },
  {
    id: 12,
    source: "Malpe",
    destination: "Kundapura",
    sourceLatitude: 13.3498,
    sourceLongitude: 74.7039,
    destinationLatitude: 13.6290,
    destinationLongitude: 74.6900,
  },
  {
    id: 13,
    source: "Kundapura",
    destination: "Puttur",
    sourceLatitude: 13.6290,
    sourceLongitude: 74.6900,
    destinationLatitude: 12.7598,
    destinationLongitude: 75.2017,
  },
  {
    id: 14,
    source: "Puttur",
    destination: "Mangalore",
    sourceLatitude: 12.7598,
    sourceLongitude: 75.2017,
    destinationLatitude: 12.9141,
    destinationLongitude: 74.8560,
  },
  {
    id: 15,
    source: "Mangalore",
    destination: "Udupi",
    sourceLatitude: 12.9141,
    sourceLongitude: 74.8560,
    destinationLatitude: 13.3409,
    destinationLongitude: 74.7421,
  },
  {
    id: 16,
    source: "Udupi",
    destination: "Puttur",
    sourceLatitude: 13.3409,
    sourceLongitude: 74.7421,
    destinationLatitude: 12.7598,
    destinationLongitude: 75.2017,
  },
  {
    id: 17,
    source: "Puttur",
    destination: "Malpe",
    sourceLatitude: 12.7598,
    sourceLongitude: 75.2017,
    destinationLatitude: 13.3498,
    destinationLongitude: 74.7039,
  },
  {
    id: 18,
    source: "Malpe",
    destination: "Mangalore",
    sourceLatitude: 13.3498,
    sourceLongitude: 74.7039,
    destinationLatitude: 12.9141,
    destinationLongitude: 74.8560,
  },
  {
    id: 19,
    source: "Mangalore",
    destination: "Kundapura",
    sourceLatitude: 12.9141,
    sourceLongitude: 74.8560,
    destinationLatitude: 13.6290,
    destinationLongitude: 74.6900,
  },
  {
    id: 20,
    source: "Kundapura",
    destination: "Udupi",
    sourceLatitude: 13.6290,
    sourceLongitude: 74.6900,
    destinationLatitude: 13.3409,
    destinationLongitude: 74.7421,
  },
  {
    id: 21,
    source: "Udupi",
    destination: "Mangalore",
    sourceLatitude: 13.3409,
    sourceLongitude: 74.7421,
    destinationLatitude: 12.9141,
    destinationLongitude: 74.8560,
  },
  {
    id: 22,
    source: "Mangalore",
    destination: "Puttur",
    sourceLatitude: 12.9141,
    sourceLongitude: 74.8560,
    destinationLatitude: 12.7598,
    destinationLongitude: 75.2017,
  },
  {
    id: 23,
    source: "Puttur",
    destination: "Kundapura",
    sourceLatitude: 12.7598,
    sourceLongitude: 75.2017,
    destinationLatitude: 13.6290,
    destinationLongitude: 74.6900,
  },
  {
    id: 24,
    source: "Kundapura",
    destination: "Malpe",
    sourceLatitude: 13.6290,
    sourceLongitude: 74.6900,
    destinationLatitude: 13.3498,
    destinationLongitude: 74.7039,
  },
  {
    id: 25,
    source: "Malpe",
    destination: "Udupi",
    sourceLatitude: 13.3498,
    sourceLongitude: 74.7039,
    destinationLatitude: 13.3409,
    destinationLongitude: 74.7421,
  },
  {
    id: 26,
    source: "Udupi",
    destination: "Puttur",
    sourceLatitude: 13.3409,
    sourceLongitude: 74.7421,
    destinationLatitude: 12.7598,
    destinationLongitude: 75.2017,
  },
  {
    id: 27,
    source: "Puttur",
    destination: "Mangalore",
    sourceLatitude: 12.7598,
    sourceLongitude: 75.2017,
    destinationLatitude: 12.9141,
    destinationLongitude: 74.8560,
  },
  {
    id: 28,
    source: "Mangalore",
    destination: "Malpe",
    sourceLatitude: 12.9141,
    sourceLongitude: 74.8560,
    destinationLatitude: 13.3498,
    destinationLongitude: 74.7039,
  },
  {
    id: 29,
    source: "Malpe",
    destination: "Kundapura",
    sourceLatitude: 13.3498,
    sourceLongitude: 74.7039,
    destinationLatitude: 13.6290,
    destinationLongitude: 74.6900,
  },
  {
    id: 30,
    source: "Kundapura",
    destination: "Puttur",
    sourceLatitude: 13.6290,
    sourceLongitude: 74.6900,
    destinationLatitude: 12.7598,
    destinationLongitude: 75.2017,
  },
];

const bookingTabsData = [
  {
    label: "All",
    value: BookingTabsDataEnum.ALL,
    content: (
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: "8px",
          height: "100%",
          overflowY: "auto",
          "& > *": { flexShrink: 0 },
        }}
      >
        {bookingData.map((booking) => (
          <CustomCardWithCheckbox
            key={booking.id}
            booking={booking}
          />
        ))}
      </Box>
    ),
  },
  {
    label: "Suggested",
    value: BookingTabsDataEnum.SUGGESTED,
    content: (
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: "8px",
          height: "100%",
          overflowY: "auto",
          "& > *": { flexShrink: 0 },
        }}
      >
        {bookingData.map((booking) => (
          <CustomCardWithCheckbox
            key={booking.id}
            booking={booking}
          />
        ))}
      </Box>
    ),
  },
];

const BookingPanel = () => {
  const { activeBookingTab, setActiveBookingTab } = useCustomHook();
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <CustomTabs tabsData={bookingTabsData} value={activeBookingTab} setValue={setActiveBookingTab as (value: string) => void}/>
    </Box>
  );
};

export default BookingPanel;