import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Settings2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '../Table/Table';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '../DropdownMenu/DropdownMenu';

/**
 * DataTable - A feature-rich data table with sorting, filtering, pagination, and column visibility
 *
 * @param {Object} props - Component props
 * @param {Array} [props.data=[]] - Array of data objects to display
 * @param {Array} [props.columns=[]] - Column definitions with id/accessor, header, cell, sortable properties
 * @param {boolean} [props.pagination=true] - Enable pagination
 * @param {number} [props.pageSize=10] - Initial number of rows per page
 * @param {boolean} [props.filterable=true] - Enable global filter input
 * @param {boolean} [props.columnVisibility=true] - Enable column visibility toggle
 * @param {React.ReactNode} [props.toolbar] - Custom toolbar content (replaces default toolbar)
 * @param {React.ReactNode} [props.emptyState] - Custom empty state content
 * @param {boolean} [props.hideToolbar=false] - Hide the toolbar completely
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * const columns = [
 *     { accessor: 'name', header: 'Name' },
 *     { accessor: 'email', header: 'Email' },
 *     { accessor: 'status', header: 'Status', cell: ({ value }) => <Badge>{value}</Badge> }
 * ];
 *
 * <DataTable
 *     data={users}
 *     columns={columns}
 *     pageSize={10}
 *     filterable
 * />
 */
export function DataTable({
    data = [],
    columns = [],
    pagination = true,
    pageSize: initialPageSize = 10,
    filterable = true,
    columnVisibility: enableColumnVisibility = true,
    toolbar,
    emptyState,
    hideToolbar = false,
    className,
    ...props
}) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [visibleColumns, setVisibleColumns] = useState(() =>
        columns.reduce((acc, col) => ({ ...acc, [col.id || col.accessor]: true }), {})
    );

    // Filter data
    const filteredData = useMemo(() => {
        if (!filter) return data;
        return data.filter((row) =>
            columns.some((col) => {
                const value = col.accessor
                    ? typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : row[col.accessor]
                    : row[col.id];
                return String(value).toLowerCase().includes(filter.toLowerCase());
            })
        );
    }, [data, columns, filter]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;
        return [...filteredData].sort((a, b) => {
            const col = columns.find(
                (c) => (c.id || c.accessor) === sortConfig.key
            );
            if (!col) return 0;

            const aValue =
                typeof col.accessor === 'function'
                    ? col.accessor(a)
                    : a[col.accessor || col.id];
            const bValue =
                typeof col.accessor === 'function'
                    ? col.accessor(b)
                    : b[col.accessor || col.id];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig, columns]);

    // Paginate data
    const paginatedData = useMemo(() => {
        if (!pagination) return sortedData;
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, pagination, currentPage, pageSize]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    const handleSort = (columnKey) => {
        setSortConfig((prev) => {
            if (prev.key !== columnKey) {
                return { key: columnKey, direction: 'asc' };
            }
            if (prev.direction === 'asc') {
                return { key: columnKey, direction: 'desc' };
            }
            return { key: null, direction: null };
        });
    };

    const toggleColumnVisibility = (columnKey) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [columnKey]: !prev[columnKey],
        }));
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <ChevronsUpDown className="ml-2 h-4 w-4" />;
        }
        if (sortConfig.direction === 'asc') {
            return <ChevronUp className="ml-2 h-4 w-4" />;
        }
        return <ChevronDown className="ml-2 h-4 w-4" />;
    };

    const visibleColumnsList = columns.filter(
        (col) => visibleColumns[col.id || col.accessor]
    );

    return (
        <div className={cn('space-y-4', className)} {...props}>
            {/* Toolbar */}
            {!hideToolbar && (toolbar || filterable || enableColumnVisibility) && (
                <div className="flex items-center justify-between gap-4">
                    {toolbar ? (
                        toolbar
                    ) : (
                        <>
                            {filterable && (
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Filter..."
                                        value={filter}
                                        onChange={(e) => {
                                            setFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="pl-9"
                                    />
                                </div>
                            )}
                            {enableColumnVisibility && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Settings2 className="mr-2 h-4 w-4" />
                                            Columns
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {columns.map((col) => {
                                            const key = col.id || col.accessor;
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={key}
                                                    checked={visibleColumns[key]}
                                                    onCheckedChange={() =>
                                                        toggleColumnVisibility(key)
                                                    }
                                                >
                                                    {col.header || key}
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="rounded-md border border-border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {visibleColumnsList.map((col) => {
                                const key = col.id || col.accessor;
                                const isSortable = col.sortable !== false;
                                return (
                                    <TableHead key={key}>
                                        {isSortable ? (
                                            <button
                                                type="button"
                                                className="flex items-center hover:text-foreground transition-colors"
                                                onClick={() => handleSort(key)}
                                            >
                                                {col.header || key}
                                                {getSortIcon(key)}
                                            </button>
                                        ) : (
                                            col.header || key
                                        )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={visibleColumnsList.length}
                                    className="h-24 text-center"
                                >
                                    {emptyState || (
                                        <span className="text-muted-foreground">No results found.</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((row, rowIndex) => (
                                <TableRow key={row.id || rowIndex}>
                                    {visibleColumnsList.map((col) => {
                                        const key = col.id || col.accessor;
                                        const value =
                                            typeof col.accessor === 'function'
                                                ? col.accessor(row)
                                                : row[col.accessor || col.id];
                                        return (
                                            <TableCell key={key}>
                                                {col.cell
                                                    ? col.cell({ value, row })
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {pagination && totalPages > 0 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
                        {sortedData.length} results
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                        >
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size} / page
                                </option>
                            ))}
                        </select>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                            >
                                First
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => p - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <span className="px-2 text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => p + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                Last
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
