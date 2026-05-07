interface Column {
  header: string
  accessor: string
  render?: (value: any, row?: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onRowClick?: (row: any) => void
}

export function DataTable({ columns, data, onRowClick }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-300">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3 text-left text-xs font-medium text-gray-900">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-gray-200 hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
            >
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-3 text-sm">
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
