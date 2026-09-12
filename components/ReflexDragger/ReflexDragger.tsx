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
    <div
      onDragStart={(e) => e.preventDefault()}
      style={{
        width: "100%",
        height: "100%",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <GlobalStyles
        styles={{
          ".reflex-container": {
            userSelect: "none",
            WebkitUserSelect: "none",
          },

          ".reflex-element.vertical": {
            height: "100%",
          },

          ".reflex-container > .reflex-splitter": {
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            zIndex: 10,
          },

          ".reflex-container.vertical > .reflex-splitter": {
            cursor: "col-resize !important",
          },

          ".reflex-container.horizontal > .reflex-splitter": {
            cursor: "row-resize !important",
          },

          ".reflex-container.reflex-resizing": {
            cursor:
              reflexContainerOrientation === "vertical"
                ? "col-resize !important"
                : "row-resize !important",
            userSelect: "none !important",
            WebkitUserSelect: "none !important",
          },

          ".reflex-container.reflex-resizing *": {
            userSelect: "none !important",
            WebkitUserSelect: "none !important",
          },

          "body.reflex-col-resize, body.reflex-col-resize *": {
            cursor: "col-resize !important",
            userSelect: "none !important",
            WebkitUserSelect: "none !important",
          },

          "body.reflex-row-resize, body.reflex-row-resize *": {
            cursor: "row-resize !important",
            userSelect: "none !important",
            WebkitUserSelect: "none !important",
          },

          ".custom-reflex-splitter": {
            backgroundColor: "rgb(233, 241, 248)",
          },

          ".custom-reflex-splitter:hover, .custom-reflex-splitter.active": {
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
                pointerEvents: "none",
                userSelect: "none",
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
    </div>
  );
};

export default ReflexDragger;