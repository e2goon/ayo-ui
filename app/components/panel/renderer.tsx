import { useStore } from "@nanostores/react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DraggablePanel } from "./draggable-panel";
import { $panelState, panel } from "./store";
import { cn } from "~/lib/utils";

export function PanelRenderer() {
  const { panels } = useStore($panelState);

  if (panels.length === 0) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const currentPanel = panels.find((panel) => panel.id === active.id);

    if (!currentPanel) return;

    panel.updatePosition(currentPanel.id, {
      x: currentPanel.position.x + delta.x,
      y: currentPanel.position.y + delta.y,
    });
  };

  return (
    <div data-slot="panel-renderer" className={cn("fixed", "inset-0", "z-50")}>
      <div
        data-slot="panel-renderer-overlay"
        className={cn("absolute", "inset-0", "z-40", "bg-black/50")}
      />

      <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
        <div
          data-slot="panel-renderer-content"
          className={cn("absolute", "inset-0", "z-50", "pointer-events-none")}
        >
          {panels.map((panel) => {
            return (
              <DraggablePanel key={panel.id} {...panel}>
                {panel.component}
              </DraggablePanel>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}
