// import type { ComponentType } from "react";
import type { ReactNode } from "react";
import { map } from "nanostores";

export interface PanelItem {
  id: string;
  component: ReactNode;
  title?: string;
  position: { x: number; y: number };
  className?: string;
}

interface PanelState {
  panels: PanelItem[];
}

const state = map<PanelState>({
  panels: [],
});

const actions = {
  open(
    component: ReactNode,
    { title, className }: { title?: string; className?: string } = {},
  ) {
    const id = crypto.randomUUID();
    const { panels } = state.get();
    const lastPanel = panels[panels.length - 1];
    const offset = 20;

    const newPosition = lastPanel
      ? {
          x: lastPanel.position.x + offset,
          y: lastPanel.position.y + offset,
        }
      : {
          x: (typeof window !== "undefined" ? window.innerWidth : 1920) / 2,
          y: (typeof window !== "undefined" ? window.innerHeight : 1080) / 2,
        };

    state.set({
      panels: [
        ...panels,
        {
          id,
          position: newPosition,
          title: title ?? "Panel",
          component,
          className,
        },
      ],
    });
  },

  close(id: string) {
    const { panels } = state.get();
    state.set({
      panels: panels.filter((panel) => panel.id !== id),
    });
  },

  updatePosition(id: string, position: { x: number; y: number }) {
    const { panels } = state.get();
    state.set({
      panels: panels.map((panel) =>
        panel.id === id ? { ...panel, position } : panel,
      ),
    });
  },

  focus(id: string) {
    const { panels } = state.get();
    const target = panels.find((panel) => panel.id === id);
    if (!target) return;
    const others = panels.filter((panel) => panel.id !== id);
    state.set({
      panels: [...others, target],
    });
  },
};

export const $panelState = state;

export const panel = {
  open: actions.open,
  close: actions.close,
  updatePosition: actions.updatePosition,
  focus: actions.focus,
};
