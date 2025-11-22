import { useStore } from "@nanostores/react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { RemoveScroll } from "react-remove-scroll";
import { DraggablePanel } from "./draggable-panel";
import { $panelState, panel } from "./store";

export function PanelRenderer() {
  const { panels } = useStore($panelState);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const currentPanel = panels.find((panel) => panel.id === active.id);

    if (!currentPanel) return;

    panel.updatePosition(currentPanel.id, {
      x: currentPanel.position.x + delta.x,
      y: currentPanel.position.y + delta.y,
    });
  };

  if (panels.length === 0) return null;

  return (
    <div
      className={"fixed inset-0 z-50"}
      data-slot="panel-renderer"
      role="application"
      aria-label="Panel Renderer"
    >
      <div
        data-slot="panel-renderer-overlay"
        className={"absolute inset-0 z-40 bg-black/50"}
      />

      <DndContext
        modifiers={[restrictToWindowEdges]}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <RemoveScroll>
          <div
            className={"pointer-events-none absolute inset-0 z-50"}
            data-slot="panel-renderer-content"
            aria-live="polite"
            aria-atomic="true"
          >
            {panels.map((panel) => {
              return (
                <DraggablePanel key={panel.id} {...panel}>
                  {panel.component}
                </DraggablePanel>
              );
            })}
          </div>
        </RemoveScroll>
      </DndContext>
    </div>
  );
}
