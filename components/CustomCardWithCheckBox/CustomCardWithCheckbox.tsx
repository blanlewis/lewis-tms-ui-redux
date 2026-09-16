import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { BookingTypes } from "@/app/utils/types";

type CustomCardWithCheckboxProps = {
  booking: BookingTypes;
};

const CustomCardWithCheckbox = ({
  booking,
}: CustomCardWithCheckboxProps) => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Checkbox
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

export default CustomCardWithCheckbox;