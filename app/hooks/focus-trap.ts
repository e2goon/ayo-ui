import { useEffect, type RefObject } from "react";

const getFocusableElements = (container: HTMLElement) => {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      "button, input, textarea, select, a[href], [tabindex]:not([tabindex='-1'])",
    ),
  ).filter((el) => !el.hasAttribute("disabled"));
};

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusedBeforeTrap = document.activeElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const focusableElements = getFocusableElements(container);
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        const current = document.activeElement;

        if (e.shiftKey) {
          if (current === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (current === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (focusedBeforeTrap && "focus" in focusedBeforeTrap) {
        (focusedBeforeTrap as HTMLElement).focus();
      }
    };
  }, [isActive, containerRef]);
}
