"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";

import Pane from "./Pane";
import type { MutableRefObject } from "react";

export interface PaneItem {
  id: string;
  label: string;
}

interface CustomDragAndDropProps {
  items: PaneItem[];
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

const CustomDragAndDrop = ({
  items,
  containerRef,
}: CustomDragAndDropProps) => {
  const [paneItems, setPaneItems] = useState(items);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) {
          return;
        }

        const { source } = event.operation;

        if (
          source &&
          "initialIndex" in source &&
          "index" in source
        ) {
          const initialIndex = Number(source.initialIndex);
          const newIndex = Number(source.index);

          if (initialIndex !== newIndex) {
            setPaneItems((currentItems) => {
              const newItems = [...currentItems];

              const [removedItem] = newItems.splice(initialIndex, 1);

              newItems.splice(newIndex, 0, removedItem);

              return newItems;
            });
          }
        }
      }}
    >
        <div
        style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "stretch",
            overflow: "hidden",
            position: "relative",
        }}
        >
        {paneItems.map((item, index) => (
          <Pane
            key={item.id}
            id={item.id}
            label={item.label}
            index={index}
            containerRef={containerRef}
          />
        ))}
      </div>
    </DragDropProvider>
  );
};

export default CustomDragAndDrop;