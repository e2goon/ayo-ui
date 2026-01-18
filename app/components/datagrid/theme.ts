import { themeQuartz } from "ag-grid-community";

export const ayoTheme = themeQuartz.withParams({
  fontFamily: "var(--font-sans)",
  headerHeight: 30,
  rowHeight: 32,
  wrapperBorderRadius: 4,
  headerColumnBorder: { style: "solid", color: "var(--ag-border-color)" },
  headerColumnResizeHandleColor: "transparent",
});
