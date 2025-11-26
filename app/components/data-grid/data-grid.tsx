import type { Table } from "@tanstack/react-table";
import { createContext, useContext, type ReactNode } from "react";

interface DataGridProps<TData> {
  table?: Table<TData>;
  enable?: boolean;
  children?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataGridContext = createContext<DataGridProps<any>>({});

function useDataGrid() {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error("useDataGrid must be used within a DataGridProvider");
  }
  return context;
}

function DataGrid<TData>({ table, enable, children }: DataGridProps<TData>) {
  if (!table) {
    throw new Error('DataGrid requires a "table" prop');
  }

  return (
    <DataGridContext.Provider value={{ table, enable }}>
      {children}
    </DataGridContext.Provider>
  );
}

export { DataGrid, useDataGrid };
