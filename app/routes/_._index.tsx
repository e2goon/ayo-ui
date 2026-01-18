import type { Route } from "./+types/_._index";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Ayo UI" },
    { name: "description", content: "Ayo UI Components" },
  ];
}

export default function IndexRoute(_: Route.ComponentProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Welcome to ayo ui</h1>
      <p>
        실무에서 직접 겪은 문제, 학습 목적, 미리 만들어놓고 실제 업무에 사용하기
        위한 목적으로 낙서장 같은 공간으로 사용하고 있습니다.
      </p>
    </div>
  );
}
