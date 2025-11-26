import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { flexRender, type Header } from "@tanstack/react-table";
import { useDataGrid } from "./data-grid";
import { cn } from "~/lib/utils";

export function DataGridTable() {
  const { table } = useDataGrid();

  return (
    <div
      // TODO: --table-height 값을 props 로 받아서 사용하도록 수정
      style={{ "--table-height": "400px" } as CSSProperties}
      className="h-(--table-height) max-w-full overflow-auto rounded-md border"
    >
      <Table>
        <TableHead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeadCell key={header.id} header={header}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {header.column.getCanResize() && (
                    <HandleCellResize header={header} />
                  )}
                </TableHeadCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <tbody>
          {table?.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export function Table({ children }: ComponentProps<"table">) {
  return (
    <table className="w-full table-fixed border-separate border-spacing-0">
      {children}
    </table>
  );
}

export function TableHead({ children }: ComponentProps<"thead">) {
  return <thead className="sticky top-0">{children}</thead>;
}

export function TableBody({ children }: ComponentProps<"tbody">) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: ComponentProps<"tr">) {
  return (
    <tr className="border-b last:[&>td]:border-b-0 last:[&>th]:border-b">
      {children}
    </tr>
  );
}

export function TableHeadCell<TData>({
  children,
  header,
}: {
  children: ReactNode;
  header: Header<TData, unknown>;
}) {
  const { column } = header;
  return (
    <th
      style={{ width: `${column.getSize()}px` }}
      colSpan={header.colSpan}
      className={cn(
        "relative truncate bg-gray-100 p-1.5 px-2 not-last:border-e",
        header.colSpan > 1 && "border-b",
      )}
    >
      {children}
    </th>
  );
}

export function TableCell({ children }: ComponentProps<"td">) {
  return (
    <td className="truncate border-b p-1.5 px-2 not-last:border-e">
      {children}
    </td>
  );
}

export function HandleCellResize<TData>({
  header,
}: {
  header: Header<TData, unknown>;
}) {
  const { column } = header;
  return (
    <div
      onDoubleClick={() => column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className="absolute top-0 -right-1 bottom-0 w-2 cursor-col-resize select-none"
    />
  );
}
