import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';

/**
 * Pagination - A pagination component for navigating through pages
 *
 * @param {Object} props - Component props
 * @param {number} [props.currentPage=1] - Current active page
 * @param {number} [props.totalPages=1] - Total number of pages
 * @param {function} [props.onPageChange] - Callback when page changes, receives the new page number
 * @param {'simple' | 'full'} [props.variant='full'] - Simple shows prev/next, full shows all page numbers
 * @param {boolean} [props.showFirstLast=true] - Show first/last page buttons
 * @param {number} [props.siblingCount=1] - Number of sibling pages to show on each side
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Pagination
 *     currentPage={page}
 *     totalPages={10}
 *     onPageChange={setPage}
 * />
 */
const paginationVariants = cva(
    'mx-auto flex w-full justify-center',
    {
        variants: {
            variant: {
                simple: 'items-center gap-2',
                full: 'items-center gap-1',
            },
        },
        defaultVariants: {
            variant: 'full',
        },
    }
);

const paginationButtonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'hover:bg-accent hover:text-accent-foreground h-9 w-9',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4',
            },
            isActive: {
                true: 'bg-accent text-accent-foreground',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            isActive: false,
        },
    }
);

export function Pagination({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    variant = 'full',
    className,
    showFirstLast = true,
    siblingCount = 1,
    ...props
}) {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange?.(page);
        }
    };

    if (variant === 'simple') {
        return (
            <nav
                role="navigation"
                aria-label="pagination"
                className={cn(paginationVariants({ variant }), className)}
                {...props}
            >
                <button
                    className={cn(paginationButtonVariants({ variant: 'outline' }))}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                </button>
                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={cn(paginationButtonVariants({ variant: 'outline' }))}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                </button>
            </nav>
        );
    }

    // Full pagination with page numbers
    const pageNumbers = generatePageNumbers(currentPage, totalPages, siblingCount);

    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn(paginationVariants({ variant }), className)}
            {...props}
        >
            <ul className="flex flex-row items-center gap-1">
                {showFirstLast && (
                    <li>
                        <button
                            className={cn(paginationButtonVariants())}
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            aria-label="Go to first page"
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </button>
                    </li>
                )}
                <li>
                    <button
                        className={cn(paginationButtonVariants())}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Go to previous page"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                </li>

                {pageNumbers.map((pageNumber, index) => {
                    if (pageNumber === 'ellipsis-left' || pageNumber === 'ellipsis-right') {
                        return (
                            <li key={`ellipsis-${index}`}>
                                <span className="flex h-9 w-9 items-center justify-center">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More pages</span>
                                </span>
                            </li>
                        );
                    }

                    return (
                        <li key={pageNumber}>
                            <button
                                className={cn(
                                    paginationButtonVariants({
                                        isActive: pageNumber === currentPage,
                                    })
                                )}
                                onClick={() => handlePageChange(pageNumber)}
                                aria-label={`Go to page ${pageNumber}`}
                                aria-current={pageNumber === currentPage ? 'page' : undefined}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}

                <li>
                    <button
                        className={cn(paginationButtonVariants())}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Go to next page"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </li>
                {showFirstLast && (
                    <li>
                        <button
                            className={cn(paginationButtonVariants())}
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            aria-label="Go to last page"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

// Helper function to generate page numbers with ellipsis
function generatePageNumbers(currentPage, totalPages, siblingCount) {
    const totalPageNumbers = siblingCount + 5; // siblings + first + last + current + 2 ellipsis

    // If total pages is less than total page numbers, show all pages
    if (totalPages <= totalPageNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
        return [...leftRange, 'ellipsis-right', totalPages];
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = Array.from(
            { length: rightItemCount },
            (_, i) => totalPages - rightItemCount + i + 1
        );
        return [1, 'ellipsis-left', ...rightRange];
    }

    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const middleRange = Array.from(
            { length: rightSiblingIndex - leftSiblingIndex + 1 },
            (_, i) => leftSiblingIndex + i
        );
        return [1, 'ellipsis-left', ...middleRange, 'ellipsis-right', totalPages];
    }

    return [];
}
