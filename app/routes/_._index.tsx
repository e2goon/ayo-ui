import type { Route } from "./+types/_._index";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Ayo UI" },
    { name: "description", content: "Ayo UI Components" },
  ];
}

export default function IndexRoute(_: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to ayo ui</h1>
    </div>
  );
}
