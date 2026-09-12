"use client";

import React, { JSX } from "react";
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement,
} from "react-reflex";
import "react-reflex/styles.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { GlobalStyles } from "@mui/material";

interface ReflexDraggerProps {
  readonly reflexContainerOrientation?: "vertical" | "horizontal";
  readonly leftpaneComponent: React.ReactNode;
  readonly rightpaneComponent: React.ReactNode;
  readonly minimumLeftPaneWidth?: number;
  readonly minimumRightPaneWidth?: number;
  readonly splitterWidth?: number;
  readonly initialLeftFlex?: number;
  readonly initialRightFlex?: number;
  readonly isDraggerIconRequired?: boolean;
}

const ReflexDragger = ({
  reflexContainerOrientation = "vertical",
  leftpaneComponent,
  rightpaneComponent,
  minimumLeftPaneWidth = 50,
  minimumRightPaneWidth = 50,
  splitterWidth = 8,
  initialLeftFlex = 0.5,
  initialRightFlex = 0.5,
  isDraggerIconRequired = false,
}: ReflexDraggerProps): JSX.Element => {
  return (
    <>
      <GlobalStyles
        styles={{
          ".reflex-element.vertical": {
            height: "100%",
          },

          ".custom-reflex-splitter": {
            backgroundColor: "rgb(233, 241, 248)",
          },

          ".custom-reflex-splitter:hover": {
            backgroundColor: "rgb(193, 215, 233) !important",
          },

          ".custom-reflex-splitter:active": {
            backgroundColor: "rgb(193, 215, 233) !important",
          },
        }}
      />

      <ReflexContainer
        style={{ width: "100%", height: "100%" }}
        orientation={reflexContainerOrientation}
      >
        <ReflexElement
          minSize={minimumLeftPaneWidth}
          flex={initialLeftFlex}
        >
          {leftpaneComponent}
        </ReflexElement>

        <ReflexSplitter
          className="custom-reflex-splitter"
          style={
            reflexContainerOrientation === "vertical"
              ? {
                  width: splitterWidth,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "col-resize",
                }
              : {
                  width: "100%",
                  height: splitterWidth,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "row-resize",
                }
          }
        >
          {isDraggerIconRequired && (
            <DragHandleIcon
              style={{
                width: splitterWidth + splitterWidth,
                transform: reflexContainerOrientation === "vertical" ? "rotate(90deg)" : "none",
              }}
            />
          )}
        </ReflexSplitter>

        <ReflexElement
          minSize={minimumRightPaneWidth}
          flex={initialRightFlex}
        >
          {rightpaneComponent}
        </ReflexElement>
      </ReflexContainer>
    </>
  );
};

export default ReflexDragger;