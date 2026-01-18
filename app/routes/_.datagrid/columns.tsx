import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { MinusIcon, PlusIcon, SaveIcon } from "lucide-react";

export type Row = { name: string } & {
  _id: string;
  _status: "add" | "update" | "delete";
};

export const columnDefs: ColDef<Row>[] = [
  {
    headerName: "Status",
    field: "_status",
    maxWidth: 80,
    lockPosition: true,
    cellRenderer: (params: ICellRendererParams<Row>) => {
      if (!params.data) return "";
      return (
        <div className="flex h-full items-center text-center">
          {params.data._status === "add" && <PlusIcon className="size-4" />}
          {params.data._status === "update" && <SaveIcon className="size-4" />}
          {params.data._status === "delete" && <MinusIcon className="size-4" />}
        </div>
      );
    },
  },
  {
    headerName: "Name",
    field: "name",
    editable: true,
  },
];
