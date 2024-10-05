"use client"

import * as React from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronsUpDown, SortAsc, SortDesc } from "lucide-react"
import { artistsData } from "@/lib/utils/constants"
import { generateArtistSlug } from "@/lib/utils"

// Define the type for our data
type Artist = {
  name: string
  totalSprites: number
}

// Convert the tuple array to an array of objects
const artists: Artist[] = artistsData.map(([name, totalSprites]) => ({
  name,
  totalSprites,
}))

const columns: ColumnDef<Artist>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            const currentSort = column.getIsSorted()
            if (currentSort === false) {
              column.toggleSorting(false) // Set to ascending
            } else if (currentSort === "asc") {
              column.toggleSorting(true) // Set to descending
            } else {
              column.clearSorting() // Clear sorting (default order)
            }
          }}
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <SortDesc className="ml-2 h-4 w-4" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link href={generateArtistSlug(row.original.name)} className="border-b-2 font-semibold text-blue-500">
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "totalSprites",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            const currentSort = column.getIsSorted()
            if (currentSort === false) {
              column.toggleSorting(false) // Set to ascending
            } else if (currentSort === "asc") {
              column.toggleSorting(true) // Set to descending
            } else {
              column.clearSorting() // Clear sorting (default order)
            }
          }}
        >
          Total Sprites
          {column.getIsSorted() === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <SortDesc className="ml-2 h-4 w-4" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
  },
]

export default function ArtistsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [pageSize, setPageSize] = React.useState(50)

  const table = useReactTable({
    data: artists,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  })

const filteredRowsLength = table.getFilteredRowModel().rows.length;

// Memoize the filtered rows count
const filteredRowsCount = React.useMemo(
  () => filteredRowsLength,
  [filteredRowsLength] // Pass the extracted variable
);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Artists of Pokémon Infinite Fusion&apos;s Sprites</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Explore the list of all artists who contributed to Pokémon Infinite Fusion&apos;s unique sprites. 
          You can filter the list to find your favorite artists and even explore the sprites they created.
          Total Artists: {artists.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-1 sm:px-6">
        <div className="flex sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
          <Input
            placeholder="Filter artists..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full sm:max-w-sm"
          />
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value))
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select page size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id}
                      className="px-2 py-3 sm:px-4 whitespace-nowrap sm:whitespace-normal text-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id} 
                        className="px-2 py-2 sm:px-4 text-center"
                      >
                        <div className="max-w-[150px] sm:max-w-none overflow-hidden break-words whitespace-normal">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-2 py-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            Showing {table.getRowModel().rows.length} of {filteredRowsCount} artists
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
