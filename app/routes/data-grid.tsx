import type { Route } from "./+types/data-grid";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { DataGrid, DataGridTable } from "~/components/data-grid";

const mockData = (count: number = 100) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `John Doe ${index + 1}`,
    email: `john.doe${index + 1}@example.com`,
    age: Math.floor(Math.random() * 100),
    availability: "offline",
    avatar: "12.png",
    status: "active",
    flag: "🇮🇳",
    company: "Tata",
    role: "Sales Manager",
    joined: "2020-03-27",
    location: "Mumbai, India",
    balance: 4521.67,
  }));
};

export async function loader() {
  const data = mockData();
  return { data };
}

export default function DataGridPage({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  const columns = useMemo<
    ColumnDef<ReturnType<typeof mockData>[number]>[]
  >(() => {
    return [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Group",
        columns: [
          {
            header: "Age",
            accessorKey: "age",
          },
          {
            header: "Availability",
            accessorKey: "availability",
          },
        ],
      },

      // {
      //   header: "Avatar",
      //   accessorKey: "avatar",
      // },
      // {
      //   header: "Status",
      //   accessorKey: "status",
      // },
      // {
      //   header: "Flag",
      //   accessorKey: "flag",
      // },
      // {
      //   header: "Company",
      //   accessorKey: "company",
      // },
      // {
      //   header: "Role",
      //   accessorKey: "role",
      // },
      // {
      //   header: "Joined",
      //   accessorKey: "joined",
      // },
      // {
      //   header: "Location",
      //   accessorKey: "location",
      // },
      // {
      //   header: "Balance",
      //   accessorKey: "balance",
      // },
    ];
  }, []);

  const table = useReactTable({
    columns,
    data,
    // pageCount: Math.ceil((demoData?.length || 0) / pagination.pageSize),
    // getRowId: (row: IData) => row.id,
    // state: {
    //   pagination,
    //   sorting,
    // },
    columnResizeMode: "onChange",
    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4">
      <DataGrid table={table}>
        <DataGridTable />
      </DataGrid>
    </div>
  );
}
