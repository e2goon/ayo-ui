import type { ComponentProps } from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export function Combobox({
  placeholder = "Select item",
  className,
  ...props
}: ComponentProps<typeof ComboboxPrimitive.Root> & {
  placeholder?: string;
  className?: string;
}) {
  return (
    <ComboboxPrimitive.Root {...props}>
      <ComboboxPrimitive.Trigger
        className={cn(
          "inline-flex min-h-[34px] min-w-[160px] flex-1 items-center border px-2 py-1 disabled:opacity-50 disabled:select-none",
          className,
        )}
      >
        <div className={"flex-1 text-left"}>
          <ComboboxPrimitive.Value>
            {(value) => {
              if (Array.isArray(value)) {
                const isEmpty = !value?.[0];
                const Label = () => (
                  <span className={cn(isEmpty && "text-gray-400")}>
                    {value[0]?.label ?? placeholder}
                  </span>
                );
                if (value.length > 1) {
                  return (
                    <>
                      <Label />
                      <small className="ml-1 text-xs">
                        +{value.length - 1}
                      </small>
                    </>
                  );
                }
                return <Label />;
              }

              const isEmpty = !value?.label;
              return (
                <span className={cn(isEmpty && "text-gray-400")}>
                  {value?.label ?? placeholder}
                </span>
              );
            }}
          </ComboboxPrimitive.Value>
        </div>

        <ComboboxPrimitive.Icon>
          <ChevronsUpDownIcon className="size-4" />
        </ComboboxPrimitive.Icon>
      </ComboboxPrimitive.Trigger>

      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner sideOffset={4}>
          <ComboboxPrimitive.Popup className="w-(--anchor-width) border bg-white p-2">
            <div>
              <ComboboxPrimitive.Input className="w-full border" />
            </div>
            <ComboboxPrimitive.List className="-mx-2 mt-2 max-h-64 overflow-y-auto">
              {(item) => {
                return (
                  <ComboboxPrimitive.Item
                    key={item.code}
                    value={item}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 px-2 py-1.5 leading-none data-highlighted:bg-gray-100",
                    )}
                  >
                    <span className="size-3 flex-none">
                      <ComboboxPrimitive.ItemIndicator>
                        <CheckIcon className="size-3" />
                      </ComboboxPrimitive.ItemIndicator>
                    </span>
                    <span className="truncate">{item.label}</span>
                  </ComboboxPrimitive.Item>
                );
              }}
            </ComboboxPrimitive.List>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  );
}
