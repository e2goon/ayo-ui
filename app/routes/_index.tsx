import type { Route } from "./+types/_index";
import { cn } from "~/lib/utils";
import { panel } from "~/components/panel";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Ayo UI" },
    { name: "description", content: "Ayo UI Components" },
  ];
}

export default function Home(_: Route.ComponentProps) {
  const handleOpenPanel = () => {
    panel.open(
      <div>
        <div>Content</div>
        <button
          type="button"
          className="cursor-pointer text-blue-500 underline"
          onClick={handleOpenPanel}
        >
          Open Panel
        </button>
      </div>,
      { title: "Panel 하하", className: cn("w-full max-w-xs") },
    );
  };

  return (
    <div className="p-4">
      <h1 className="font-bold">Panel</h1>
      <p>
        판넬을 여러개 띄우고, 드래그로 이동할 수 있습니다. nanostores 로 상태를
        관리하며 dndkit 으로 드래그 기능을 구현했습니다.
      </p>

      <br />

      <button
        type="button"
        className="cursor-pointer border px-1.5"
        onClick={handleOpenPanel}
      >
        Open Panel
      </button>
    </div>
  );
}
