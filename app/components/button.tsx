import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export function Button({
  children,
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "flex",
        "h-8",
        "items-center",
        "justify-center",
        "rounded-md",
        "border",
        "border-gray-200",
        "bg-gray-50",
        "px-2",
        "leading-6",
        "font-medium",
        "text-gray-900",
        "outline-0",
        "select-none",
        "hover:bg-gray-100",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:-outline-offset-1",
        "focus-visible:outline-blue-800",
        "active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        "data-disabled:text-gray-500",
        "active:border-t-gray-300",
        "active:bg-gray-200",
        "hover:data-disabled:bg-gray-50",
        "active:data-disabled:border-t-gray-200",
        "active:data-disabled:bg-gray-50",
        "active:data-disabled:shadow-none",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
