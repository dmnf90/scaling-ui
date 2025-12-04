import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Table - A semantic HTML table with styled components
 *
 * Sub-components:
 * - TableHeader: Table header wrapper (<thead>)
 * - TableBody: Table body wrapper (<tbody>)
 * - TableFooter: Table footer wrapper (<tfoot>)
 * - TableRow: Table row (<tr>)
 * - TableHead: Table header cell (<th>)
 * - TableCell: Table data cell (<td>)
 * - TableCaption: Table caption
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Table sub-components
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Table>
 *     <TableHeader>
 *         <TableRow>
 *             <TableHead>Name</TableHead>
 *             <TableHead>Email</TableHead>
 *         </TableRow>
 *     </TableHeader>
 *     <TableBody>
 *         <TableRow>
 *             <TableCell>John Doe</TableCell>
 *             <TableCell>john@example.com</TableCell>
 *         </TableRow>
 *     </TableBody>
 * </Table>
 */
export function Table({ className, children, ...props }) {
    return (
        <div className="relative w-full overflow-auto">
            <table
                className={cn('w-full caption-bottom text-sm', className)}
                {...props}
            >
                {children}
            </table>
        </div>
    );
}

/**
 * TableHeader - Table header wrapper (<thead>)
 */
export function TableHeader({ className, children, ...props }) {
    return (
        <thead className={cn('[&_tr]:border-b', className)} {...props}>
            {children}
        </thead>
    );
}

/**
 * TableBody - Table body wrapper (<tbody>)
 */
export function TableBody({ className, children, ...props }) {
    return (
        <tbody
            className={cn('[&_tr:last-child]:border-0', className)}
            {...props}
        >
            {children}
        </tbody>
    );
}

/**
 * TableFooter - Table footer wrapper (<tfoot>)
 */
export function TableFooter({ className, children, ...props }) {
    return (
        <tfoot
            className={cn(
                'border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0',
                className
            )}
            {...props}
        >
            {children}
        </tfoot>
    );
}

/**
 * TableRow - Table row (<tr>)
 */
export function TableRow({ className, children, ...props }) {
    return (
        <tr
            className={cn(
                'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
                className
            )}
            {...props}
        >
            {children}
        </tr>
    );
}

/**
 * TableHead - Table header cell (<th>)
 */
export function TableHead({ className, children, ...props }) {
    return (
        <th
            className={cn(
                'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
                className
            )}
            {...props}
        >
            {children}
        </th>
    );
}

/**
 * TableCell - Table data cell (<td>)
 */
export function TableCell({ className, children, ...props }) {
    return (
        <td
            className={cn(
                'p-4 align-middle [&:has([role=checkbox])]:pr-0',
                className
            )}
            {...props}
        >
            {children}
        </td>
    );
}

/**
 * TableCaption - Table caption element
 */
export function TableCaption({ className, children, ...props }) {
    return (
        <caption
            className={cn('mt-4 text-sm text-muted-foreground', className)}
            {...props}
        >
            {children}
        </caption>
    );
}
