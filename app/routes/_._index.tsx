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
      <p>
        실무에서 직접 겪은 문제를 바탕으로, 학습 목적으로 만들어 본
        라이브러리입니다.
      </p>
    </div>
  );
}
