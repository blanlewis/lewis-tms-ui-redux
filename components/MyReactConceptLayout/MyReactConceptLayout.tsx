import { Box } from "@mui/material";
import ReflexDragger from "@/components/ReflexDragger";

const MyReactConceptLayout = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <ReflexDragger
        reflexContainerOrientation="vertical"
        leftpaneComponent={
          <Box
            sx={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              border: "1px solid red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Left Side (50%)
          </Box>
        }
        rightpaneComponent={
          <Box
            sx={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              border: "1px solid blue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Right Side (50%)
          </Box>
        }
        minimumLeftPaneWidth={100}
        minimumRightPaneWidth={100}
        splitterWidth={10}
        initialLeftFlex={0.5}
        initialRightFlex={0.5}
        isDraggerIconRequired={false}
      />
    </Box>
  );
};

export default MyReactConceptLayout;