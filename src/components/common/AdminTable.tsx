import React, { useState } from 'react';
import { useColumnVisibility, ColumnConfig } from '@/hooks/useColumnVisibility';
import { ChevronDown, Check, X } from 'lucide-react';

interface AdminTableProps<T> {
  tableKey: string; // unique key for localStorage
  columns: ColumnConfig[];
  data: T[];
  renderRow: (item: T, visibleColumns: ColumnConfig[]) => React.ReactNode;
  className?: string;
}

function AdminTable<T>({ tableKey, columns: defaultColumns, data, renderRow, className }: AdminTableProps<T>) {
  const {
    columns,
    visibleColumns,
    toggleColumn,
    resetToDefault,
  } = useColumnVisibility(tableKey, defaultColumns);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className={`relative ${className || ''}`}>
      {/* Column Selection Dropdown */}
      <div className="mb-2 flex justify-end">
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            Columns <ChevronDown className="ml-1 h-4 w-4" />
          </button>

          {dropdownOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-60 overflow-auto"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                {columns.map((col) => (
                  <label
                    key={col.key}
                    className={`flex items-center px-4 py-2 text-sm cursor-pointer select-none ${
                      col.isRequired ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={col.isVisible}
                      disabled={col.isRequired}
                      onChange={() => toggleColumn(col.key)}
                      className="mr-2"
                    />
                    {col.label}
                  </label>
                ))}
                <div className="border-t border-gray-200 mt-1 pt-1 px-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetToDefault();
                    }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Reset to default
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, idx) => (
              <tr key={idx}>
                {renderRow(item, visibleColumns)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTable;
