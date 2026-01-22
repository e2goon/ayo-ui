import { type Ref } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
import { ayoTheme } from "./theme";

ModuleRegistry.registerModules([AllCommunityModule]);

export function Datagrid<T>({
  ref,
  ...props
}: AgGridReactProps<T> & {
  ref?: Ref<AgGridReact<T>>;
}) {
  return (
    <div className="h-full">
      <AgGridReact
        ref={ref}
        theme={ayoTheme}
        noRowsOverlayComponent={() => <div>데이터가 없습니다.</div>}
        loadingOverlayComponent={() => <div>로딩중...</div>}
        singleClickEdit
        stopEditingWhenCellsLoseFocus
        {...props}
      />
    </div>
  );
}
