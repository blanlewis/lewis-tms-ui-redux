"use client";

import {
  Children,
  createContext,
  useContext,
  useState,
  type ReactNode,
  type MutableRefObject,
} from "react";

import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";

interface CustomDragAndDropProps {
  children: ReactNode;
}

interface CustomDragAndDropItemProps {
  id: string;
  children: ReactNode;
}

interface SortableItemProps {
  id: string;
  index: number;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  children: ReactNode;
}

interface DragAndDropContextValue {
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

const DragAndDropContext =
  createContext<DragAndDropContextValue | null>(null);

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
  id,
  children,
}: CustomDragAndDropItemProps) => {
  const context = useContext(DragAndDropContext);

  if (!context) {
    throw new Error(
      "CustomDragAndDrop.Item must be used inside CustomDragAndDrop."
    );
  }

  return (
    <SortableItem
      id={id}
      index={0}
      containerRef={context.containerRef}
    >
      {children}
    </SortableItem>
  );
};

const CustomDragAndDrop = ({
  children,
}: CustomDragAndDropProps) => {
  const containerRef =
    useState<MutableRefObject<HTMLDivElement | null>>(
      () => ({ current: null })
    )[0];

  const childArray = Children.toArray(children);

  const [itemOrder, setItemOrder] = useState(() =>
    childArray.map((_, index) => index)
  );

  return (
    <DragAndDropContext.Provider
      value={{
        containerRef,
      }}
    >
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
              setItemOrder((currentOrder) => {
                const newOrder = [...currentOrder];

                const [removedItem] = newOrder.splice(
                  initialIndex,
                  1
                );

                newOrder.splice(newIndex, 0, removedItem);

                return newOrder;
              });
            }
          }
        }}
      >
        <div
          ref={(element) => {
            containerRef.current = element;
          }}
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
          {itemOrder.map((childIndex, index) => {
            const child = childArray[childIndex];

            if (!child) {
              return null;
            }

            return (
              <SortableItemWrapper
                key={childIndex}
                child={child}
                index={index}
                containerRef={containerRef}
              />
            );
          })}
        </div>
      </DragDropProvider>
    </DragAndDropContext.Provider>
  );
};

interface SortableItemWrapperProps {
  child: ReactNode;
  index: number;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

const SortableItemWrapper = ({
  child,
  index,
  containerRef,
}: SortableItemWrapperProps) => {
  /*
   * The actual ID comes from CustomDragAndDrop.Item.
   */
  if (
    typeof child === "object" &&
    child !== null &&
    "props" in child
  ) {
    const element = child as React.ReactElement<{
      id?: string;
      children?: ReactNode;
    }>;

    return (
      <SortableItem
        id={element.props.id ?? `item-${index}`}
        index={index}
        containerRef={containerRef}
      >
        {element.props.children}
      </SortableItem>
    );
  }

  return (
    <SortableItem
      id={`item-${index}`}
      index={index}
      containerRef={containerRef}
    >
      {child}
    </SortableItem>
  );
};

CustomDragAndDrop.Item = CustomDragAndDropItem;

export default CustomDragAndDrop;