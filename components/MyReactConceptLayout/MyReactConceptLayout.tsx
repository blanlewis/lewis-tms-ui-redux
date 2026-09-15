"use client";
import { Box } from "@mui/material";
import ReflexDragger from "@/components/ReflexDragger";
import { useCustomHook } from "@/app/utils/hook";
import { PageLayoutEnum } from "@/app/utils/types";
// import MapComponent from "@/components/MapComponent";
import dynamic from "next/dynamic"; 
const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false, });

const TwoPanelLayout = () => {
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
            <MapComponent />
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

const ThreePanelLayout = () => {
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
          <ReflexDragger
            reflexContainerOrientation="horizontal"
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
                Left Top
              </Box>
            }
            rightpaneComponent={
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  boxSizing: "border-box",
                  border: "1px solid green",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Left Bottom
              </Box>
            }
            minimumLeftPaneWidth={50}
            minimumRightPaneWidth={50}
            splitterWidth={10}
            initialLeftFlex={0.5}
            initialRightFlex={0.5}
            isDraggerIconRequired={false}
          />
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

const ClassicLayout = () => {
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
        reflexContainerOrientation="horizontal"
        leftpaneComponent={
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
                Top Left
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
                Top Right
              </Box>
            }
            minimumLeftPaneWidth={50}
            minimumRightPaneWidth={50}
            splitterWidth={10}
            initialLeftFlex={0.5}
            initialRightFlex={0.5}
            isDraggerIconRequired={false}
          />
        }
        rightpaneComponent={
          <Box
            sx={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              border: "1px solid green",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Bottom Side
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

const MyReactConceptLayout = () => {
  const { pageLayout } = useCustomHook();
  return pageLayout === PageLayoutEnum.TWO_PANEL_LAYOUT ? (
    <TwoPanelLayout />
  ) : pageLayout === PageLayoutEnum.THREE_PANEL_LAYOUT ? (
    <ThreePanelLayout />
  ) : (
    <ClassicLayout />
  );
};

export default MyReactConceptLayout;