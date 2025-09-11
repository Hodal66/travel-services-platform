import { useState, useEffect } from 'react';

export interface ColumnConfig {
  key: string;
  label: string;
  isVisible: boolean;
  isRequired?: boolean; // Required columns cannot be hidden
}

export interface UseColumnVisibilityReturn {
  columns: ColumnConfig[];
  visibleColumns: ColumnConfig[];
  toggleColumn: (key: string) => void;
  resetToDefault: () => void;
  isColumnVisible: (key: string) => boolean;
}

export const useColumnVisibility = (
  tableKey: string,
  defaultColumns: ColumnConfig[]
): UseColumnVisibilityReturn => {
  // Load saved preferences from localStorage
  const loadSavedPreferences = (): ColumnConfig[] => {
    try {
      const saved = localStorage.getItem(`table-columns-${tableKey}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge saved preferences with default columns
        return defaultColumns.map(defaultCol => {
          const savedCol = parsed.find((col: ColumnConfig) => col.key === defaultCol.key);
          return savedCol ? { ...defaultCol, isVisible: savedCol.isVisible } : defaultCol;
        });
      }
    } catch (error) {
      console.warn('Failed to load column preferences from localStorage:', error);
    }
    return defaultColumns;
  };

  const [columns, setColumns] = useState<ColumnConfig[]>(loadSavedPreferences);

  // Save preferences to localStorage whenever columns change
  useEffect(() => {
    try {
      localStorage.setItem(`table-columns-${tableKey}`, JSON.stringify(columns));
    } catch (error) {
      console.warn('Failed to save column preferences to localStorage:', error);
    }
  }, [columns, tableKey]);

  // Get visible columns
  const visibleColumns = columns.filter(col => col.isVisible);

  // Toggle column visibility
  const toggleColumn = (key: string) => {
    setColumns(prevColumns =>
      prevColumns.map(col => {
        if (col.key === key) {
          // Don't allow hiding required columns
          if (col.isRequired && col.isVisible) {
            return col;
          }
          // Ensure at least 4 columns remain visible
          const visibleCount = prevColumns.filter(c => c.isVisible && c.key !== key).length;
          if (!col.isVisible && visibleCount < 4) {
            return col; // Don't show if it would go below minimum
          }
          return { ...col, isVisible: !col.isVisible };
        }
        return col;
      })
    );
  };

  // Reset to default configuration
  const resetToDefault = () => {
    setColumns(defaultColumns);
  };

  // Check if a column is visible
  const isColumnVisible = (key: string): boolean => {
    const column = columns.find(col => col.key === key);
    return column ? column.isVisible : false;
  };

  return {
    columns,
    visibleColumns,
    toggleColumn,
    resetToDefault,
    isColumnVisible,
  };
};
