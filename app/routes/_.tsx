import type { Route } from "./+types/_";
import { href, Link, Outlet } from "react-router";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Ayo UI" },
    { name: "description", content: "Ayo UI Components" },
  ];
}

export default function RootLayout() {
  return (
    <div>
      <header className="p-4">
        <Link to={href("/")} className="font-black">
          ayo ui
        </Link>

        <div className="mt-4 flex space-x-2 *:underline">
          <Link to={href("/panel")}>Panel</Link>
          <Link to={href("/combobox")}>Combobox</Link>
        </div>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
