import type { AgGridReact } from "ag-grid-react";
import { useRef } from "react";
import { MinusIcon, PlusIcon, SaveIcon } from "lucide-react";
import { columnDefs, type Row } from "./columns";
import { Button } from "~/components/button";
import { Datagrid } from "~/components/datagrid";

export default function DatagridRoute() {
  const gridRef = useRef<AgGridReact>(null);

  const handleAddRow = () => {
    const randomId = crypto.randomUUID().slice(0, 8);
    const newRow: Row = {
      _id: randomId,
      _status: "add",
      name: "",
    };
    gridRef.current?.api.applyTransaction({
      add: [newRow],
    });
  };

  const handleDeleteRow = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (!selectedRows) return;
    gridRef.current?.api.applyTransaction({
      remove: selectedRows,
    });
  };

  const handleSave = () => {
    const rowData = gridRef.current?.api
      .getRenderedNodes()
      .map((node) => node.data);
    if (!rowData) return;
    alert(JSON.stringify(rowData));
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-lg font-bold">Datagrid</h1>
        <p>
          실제 프로젝트에서 이 기능을 빈번하게 사용하고 있습니다. 미리
          만들어놓고 재사용하기 위한 목적으로 모아놓았습니다.
        </p>
      </header>

      <div className="flex justify-end gap-2">
        <Button type="button" onClick={handleAddRow} className="space-x-1">
          <PlusIcon className="size-4" />
          <span>행 추가</span>
        </Button>

        <Button type="button" onClick={handleDeleteRow} className="space-x-1">
          <MinusIcon className="size-4" />
          <span>행 삭제</span>
        </Button>

        <Button type="button" onClick={handleSave} className="space-x-1">
          <SaveIcon className="size-4" />
          <span>저장</span>
        </Button>
      </div>

      <div className="h-[500px] w-full">
        <Datagrid<Row>
          ref={gridRef}
          getRowId={(params) => params.data._id}
          rowData={[]}
          defaultColDef={{ flex: 1 }}
          columnDefs={columnDefs}
          rowSelection={{
            mode: "singleRow",
            enableClickSelection: true,
          }}
        />
      </div>
    </div>
  );
}
