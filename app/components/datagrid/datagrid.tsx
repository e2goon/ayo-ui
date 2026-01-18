import React, { forwardRef } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
import { ayoTheme } from "./theme";

ModuleRegistry.registerModules([AllCommunityModule]);

type DatagridComponent = <TData>(
  props: AgGridReactProps<TData> & React.RefAttributes<AgGridReact<TData>>,
) => React.ReactElement;

export const Datagrid = forwardRef(function DatagridRefComponent(props, ref) {
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
}) as DatagridComponent;
