"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import type { RefObject } from "react";

interface PaneProps {
  id: string;
  label: string;
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

const Pane = ({
  id,
  label,
  index,
  containerRef,
}: PaneProps) => {
  const { ref } = useSortable({
    id,
    index,
    modifiers: [
      RestrictToVerticalAxis,

      RestrictToElement.configure({
        element: () => containerRef.current,
      }),
    ],
  });

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "36px",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        fontSize: "14px",
        fontWeight: 600,
        color: "#344054",

        borderRadius: "6px",
        lineHeight: "normal",

        backgroundColor: "#FFFFFF",
        border: "1px solid #D0D5DD",

        boxShadow: "none",
        boxSizing: "border-box",

        padding: "6px 12px",

        cursor: "grab",
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
};

export default Pane;