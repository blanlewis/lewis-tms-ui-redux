import { Box } from '@mui/material';
import DossierPanel from '@/components/DossierPanel';
import ReflexDragger from "@/components/ReflexDragger";
import { useCustomHook } from "@/app/utils/hook";
import { PageLayoutEnum } from "@/app/utils/types";
import dynamic from "next/dynamic";
import BookingPanel from "@/components/BookingPanel";

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
            }}
          >
            <BookingPanel />
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
        splitterWidth={4}
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
              }}
            >
              <BookingPanel />
            </Box>
            }
            rightpaneComponent={
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid green",
                }}
              >
                <DossierPanel />
              </Box>
            }
            minimumLeftPaneWidth={50}
            minimumRightPaneWidth={50}
            splitterWidth={4}
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
            <MapComponent />
          </Box>
        }
        minimumLeftPaneWidth={100}
        minimumRightPaneWidth={100}
        splitterWidth={4}
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
                }}
              >
                <BookingPanel />
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
            minimumLeftPaneWidth={50}
            minimumRightPaneWidth={50}
            splitterWidth={4}
            initialLeftFlex={0.5}
            initialRightFlex={0.5}
            isDraggerIconRequired={false}
          />
        }
        rightpaneComponent={
          <Box
            sx={{
              width: "100%",
              border: "1px solid green",
            }}
          >
           <DossierPanel />
          </Box>
        }
        minimumLeftPaneWidth={100}
        minimumRightPaneWidth={100}
        splitterWidth={4}
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