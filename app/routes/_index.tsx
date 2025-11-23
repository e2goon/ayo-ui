import type { Route } from "./+types/_index";
import { cn } from "~/lib/utils";
import { $panelState, panel } from "~/components/panel";
import { Button } from "~/components/button";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Ayo UI" },
    { name: "description", content: "Ayo UI Components" },
  ];
}

export default function Home(_: Route.ComponentProps) {
  const handleOpenPanel = () => {
    const { panels } = $panelState.get();
    const panelCount = panels.length + 1;
    panel.open(
      <div className="space-y-2">
        <div>Content</div>
        <Button type="button" onClick={handleOpenPanel}>
          Open Panel
        </Button>
      </div>,
      { title: `Panel ${panelCount}`, className: cn("w-full max-w-xs") },
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Panel</h1>
      <p>
        판넬을 여러개 띄우고, 드래그로 이동할 수 있습니다. nanostores 로 상태를
        관리하며 dndkit 으로 드래그 기능을 구현했습니다.
      </p>

      <br />

      <Button type="button" onClick={handleOpenPanel}>
        Open Panel
      </Button>
    </div>
  );
}
