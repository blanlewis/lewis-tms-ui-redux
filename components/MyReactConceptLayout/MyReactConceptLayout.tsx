import { Box } from "@mui/material";
import DossierPanel from "@/components/DossierPanel";
import ReflexDragger from "@/components/ReflexDragger";
import { useCustomHook } from "@/app/utils/hook";
import {
    PageLayoutEnum,
    PageLayoutPaneEnum,
} from "@/app/utils/types";
import dynamic from "next/dynamic";
import BookingPanel from "@/components/BookingPanel";

const MapComponent = dynamic(
    () => import("@/components/MapComponent"),
    {
        ssr: false,
    }
);

const TwoPanelLayout = ({
    pageLayoutPane1,
    pageLayoutPane2,
}: {
    pageLayoutPane1: PageLayoutPaneEnum;
    pageLayoutPane2: PageLayoutPaneEnum;
}) => {
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
                        {pageLayoutPane1 === PageLayoutPaneEnum.BOOKING_PANE ? (
                            <BookingPanel />
                        ) : pageLayoutPane1 === PageLayoutPaneEnum.MAP_PANE ? (
                            <MapComponent />
                        ) : (
                            <DossierPanel />
                        )}
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
                        {pageLayoutPane2 === PageLayoutPaneEnum.BOOKING_PANE ? (
                            <BookingPanel />
                        ) : pageLayoutPane2 === PageLayoutPaneEnum.MAP_PANE ? (
                            <MapComponent />
                        ) : (
                            <DossierPanel />
                        )}
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

const ThreePanelLayout = ({
    pageLayoutPane1,
    pageLayoutPane2,
    pageLayoutPane3,
}: {
    pageLayoutPane1: PageLayoutPaneEnum;
    pageLayoutPane2: PageLayoutPaneEnum;
    pageLayoutPane3: PageLayoutPaneEnum;
}) => {
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
                                {pageLayoutPane1 === PageLayoutPaneEnum.BOOKING_PANE ? (
                                    <BookingPanel />
                                ) : pageLayoutPane1 === PageLayoutPaneEnum.MAP_PANE ? (
                                    <MapComponent />
                                ) : (
                                    <DossierPanel />
                                )}
                            </Box>
                        }
                        rightpaneComponent={
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    boxSizing: "border-box",
                                    border: "1px solid green",
                                }}
                            >
                                {pageLayoutPane3 === PageLayoutPaneEnum.BOOKING_PANE ? (
                                    <BookingPanel />
                                ) : pageLayoutPane3 === PageLayoutPaneEnum.MAP_PANE ? (
                                    <MapComponent />
                                ) : (
                                    <DossierPanel />
                                )}
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
                        {pageLayoutPane2 === PageLayoutPaneEnum.BOOKING_PANE ? (
                            <BookingPanel />
                        ) : pageLayoutPane2 === PageLayoutPaneEnum.MAP_PANE ? (
                            <MapComponent />
                        ) : (
                            <DossierPanel />
                        )}
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

const ClassicLayout = ({
    pageLayoutPane1,
    pageLayoutPane2,
    pageLayoutPane3,
}: {
    pageLayoutPane1: PageLayoutPaneEnum;
    pageLayoutPane2: PageLayoutPaneEnum;
    pageLayoutPane3: PageLayoutPaneEnum;
}) => {
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
                                {pageLayoutPane1 === PageLayoutPaneEnum.BOOKING_PANE ? (
                                    <BookingPanel />
                                ) : pageLayoutPane1 === PageLayoutPaneEnum.MAP_PANE ? (
                                    <MapComponent />
                                ) : (
                                    <DossierPanel />
                                )}
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
                                {pageLayoutPane2 === PageLayoutPaneEnum.BOOKING_PANE ? (
                                    <BookingPanel />
                                ) : pageLayoutPane2 === PageLayoutPaneEnum.MAP_PANE ? (
                                    <MapComponent />
                                ) : (
                                    <DossierPanel />
                                )}
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
                            border: "1px solid green",
                        }}
                    >
                        {pageLayoutPane3 === PageLayoutPaneEnum.BOOKING_PANE ? (
                            <BookingPanel />
                        ) : pageLayoutPane3 === PageLayoutPaneEnum.MAP_PANE ? (
                            <MapComponent />
                        ) : (
                            <DossierPanel />
                        )}
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

    return pageLayout.layout === PageLayoutEnum.TWO_PANEL_LAYOUT ? (
        <TwoPanelLayout
            pageLayoutPane1={pageLayout.pane1}
            pageLayoutPane2={pageLayout.pane2}
        />
    ) : pageLayout.layout === PageLayoutEnum.THREE_PANEL_LAYOUT ? (
        <ThreePanelLayout
            pageLayoutPane1={pageLayout.pane1}
            pageLayoutPane2={pageLayout.pane2}
            pageLayoutPane3={pageLayout.pane3}
        />
    ) : (
        <ClassicLayout
            pageLayoutPane1={pageLayout.pane1}
            pageLayoutPane2={pageLayout.pane2}
            pageLayoutPane3={pageLayout.pane3}
        />
    );
};

export default MyReactConceptLayout;