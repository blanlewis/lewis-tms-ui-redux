"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";

interface CustomDragAndDropProps {
  children: ReactNode;
  initialOrder: string[];
  onRearrange: (newOrder: string[]) => void;
}

interface CustomDragAndDropItemProps {
  id: string;
  children: ReactNode;
}

interface SortableItemProps {
  id: string;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

type DragAndDropItemElement =
  ReactElement<CustomDragAndDropItemProps>;

const SortableItem = ({
  id,
  index,
  containerRef,
  children,
}: SortableItemProps) => {
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
      }}
    >
      {children}
    </div>
  );
};

const CustomDragAndDropItem = ({
  children,
}: CustomDragAndDropItemProps) => {
  return <>{children}</>;
};

const CustomDragAndDrop = ({
  children,
  initialOrder,
  onRearrange,
}: CustomDragAndDropProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const childArray = Children.toArray(
    children
  ) as DragAndDropItemElement[];

  const [itemOrder, setItemOrder] = useState<string[]>(
    initialOrder
  );

  /*
   * Keep the local drag/drop order in sync with pageLayout
   * when the parent changes it.
   */
  useEffect(() => {
    setItemOrder(initialOrder);
  }, [initialOrder]);

  const itemMap = new Map(
    childArray.map((child) => [
      child.props.id,
      child,
    ])
  );

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
            const newOrder = [...itemOrder];

            const [removedItem] = newOrder.splice(
              initialIndex,
              1
            );

            newOrder.splice(newIndex, 0, removedItem);

            setItemOrder(newOrder);

            /*
             * Tell the parent about the successful
             * rearrangement.
             */
            onRearrange(newOrder);
          }
        }
      }}
    >
      <div
        ref={containerRef}
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
        {itemOrder.map((id, index) => {
          const item = itemMap.get(id);

          if (!item) {
            return null;
          }

          return (
            <SortableItem
              key={id}
              id={id}
              index={index}
              containerRef={containerRef}
            >
              {item.props.children}
            </SortableItem>
          );
        })}
      </div>
    </DragDropProvider>
  );
};

CustomDragAndDrop.Item = CustomDragAndDropItem;

export default CustomDragAndDrop;