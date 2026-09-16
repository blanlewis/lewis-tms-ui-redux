"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import { BookingTypes } from "@/app/utils/types";
import { useCustomHook } from "@/app/utils/hook";

type BookingCardWithCheckboxProps = {
  booking: BookingTypes;
};

const BookingCardWithCheckbox = ({
  booking,
}: BookingCardWithCheckboxProps) => {

  const { selectedBookings, setSelectedBookings } = useCustomHook();
  const selected = selectedBookings.includes(booking.id);

  const handleCardClick = () => {
    if (selected) {
      setSelectedBookings(selectedBookings.filter((id: number) => id !== booking.id));
    } else {
      setSelectedBookings([...selectedBookings, booking.id]);
    }
  };
  return (
    <Card>
      <CardActionArea
        onClick={handleCardClick}
        data-active={selected ? "" : undefined}
        sx={{
          "&[data-active]": {
            backgroundColor: "action.selected",

            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
      >
        <CardContent sx={{ padding: "8px" }}>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <Checkbox
              checked={selected}
              onChange={(event) => {
                event.stopPropagation();
                if (event.target.checked) {
                  setSelectedBookings([...selectedBookings, booking.id]);
                } else {
                  setSelectedBookings(selectedBookings.filter((id: number) => id !== booking.id));
                }
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
              disableRipple
              sx={{
                color: "#000",
                "&.Mui-checked": {
                  color: "blue",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            />

            <Stack>
              <Typography variant="h6" component="div">
                {booking.source} → {booking.destination}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Source: {booking.sourceLatitude},{" "}
                {booking.sourceLongitude}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Destination: {booking.destinationLatitude},{" "}
                {booking.destinationLongitude}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookingCardWithCheckbox;