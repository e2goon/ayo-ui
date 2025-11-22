import { memo, useEffect, type PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useStore } from "@nanostores/react";
import { $panelState, panel, type PanelItem } from "./store";
import { cn } from "~/lib/utils";

export const DraggablePanel = memo(
  function DraggablePanel({
    id,
    title,
    position,
    children,
  }: PropsWithChildren<PanelItem>) {
    const { panels } = useStore($panelState);
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
      if (panels.length === 0) return;
      const lastPanel = panels[panels.length - 1];
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          panel.close(lastPanel.id);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [panels]);

    const handleFocus = () => panel.focus(id);

    return (
      <div
        ref={setNodeRef}
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
          "rounded-md",
          "bg-white",
          "p-3",
          "text-black",
          "shadow-lg",
          "-translate-1/2",
          "transition-shadow",
          "whitespace-nowrap",
          "overflow-hidden",
          isDragging && "shadow",
        )}
        onPointerDown={handleFocus}
      >
        <header
          {...attributes}
          {...listeners}
          className="-m-3 mb-0 cursor-move bg-gray-200 px-3 py-1.5"
          aria-label="Panel Header. Drag to move."
        >
          <h1 id={id} className="font-bold" aria-label="Panel Title">
            {title}
          </h1>
        </header>
        <div
          className="mt-3"
          role="region"
          id={`panel-content-${id}`}
          aria-label="Panel Content"
          data-slot="panel-content"
        >
          <span className="text-xs text-gray-500">{id}</span>
          <div>{children}</div>
        </div>
        <footer className="flex" role="group" aria-label="Panel Footer">
          <button
            type="button"
            onClick={() => panel.close(id)}
            className="ml-auto cursor-pointer"
            aria-label={`${title} Panel Close Button`}
          >
            close
          </button>
        </footer>
      </div>
    );
  },
  (prev, next) =>
    prev.position.x === next.position.x && prev.position.y === next.position.y,
);
