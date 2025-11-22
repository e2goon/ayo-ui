import { memo, useEffect, useRef, type PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useStore } from "@nanostores/react";
import { XIcon } from "lucide-react";
import { $panelState, panel, type PanelItem } from "./store";
import { cn } from "~/lib/utils";
import { useFocusTrap } from "~/hooks/focus-trap";

export const DraggablePanel = memo(
  function DraggablePanel({
    id,
    title,
    position,
    className,
    children,
  }: PropsWithChildren<PanelItem>) {
    const panelRef = useRef<HTMLDivElement>(null);
    const { panels } = useStore($panelState);
    const lastPanel = panels[panels.length - 1];
    const isLastPanel = id === lastPanel.id;
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id,
      });
    const style = {
      top: `${position.y}px`,
      left: `${position.x}px`,
      transform: CSS.Transform.toString(transform),
    };

    useEffect(() => {
      if (!isLastPanel) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          panel.close(id);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [id, isLastPanel]);

    useFocusTrap(panelRef, isLastPanel);

    const handleFocus = () => {
      if (isLastPanel) return;
      panel.focus(id);
    };

    const handleClose = () => panel.close(id);

    return (
      <div
        ref={(node) => {
          setNodeRef(node);
          if (node) panelRef.current = node;
        }}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        aria-describedby={`panel-content-${id}`}
        data-slot="panel"
        tabIndex={-1}
        className={cn(
          "pointer-events-auto",
          "absolute",
          "p-3",
          "rounded-md",
          "bg-white",
          "text-black",
          "shadow-lg",
          "-translate-1/2",
          "transition-shadow",
          "whitespace-nowrap",
          "overflow-hidden",
          "active:shadow",
          isDragging && "shadow",
          isLastPanel && "outline-2 outline-blue-500/50",
          className,
        )}
        onPointerDown={handleFocus}
      >
        <div
          {...attributes}
          {...listeners}
          className="-m-3 mb-0 flex touch-none items-center gap-2 bg-gray-200 px-3 py-1.5 select-none"
          aria-label="Panel Header. Drag to move."
        >
          <h2 id={id} className="font-bold" aria-label="Panel Title">
            {title}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="ml-auto cursor-pointer text-gray-500 outline-none hover:text-black focus:text-black"
            aria-label={`${title} Panel Close Button`}
          >
            <XIcon className="size-4" />
          </button>
        </div>
        <div
          className="mt-3"
          role="region"
          id={`panel-content-${id}`}
          aria-label="Panel Content"
          data-slot="panel-content"
        >
          {children}
        </div>
      </div>
    );
  },
  (prev, next) =>
    prev.position.x === next.position.x && prev.position.y === next.position.y,
);
