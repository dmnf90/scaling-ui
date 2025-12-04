import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Progress - A progress bar component showing completion status
 *
 * @param {Object} props - Component props
 * @param {number} [props.value] - Current progress value (null for indeterminate state)
 * @param {number} [props.max=100] - Maximum value for the progress bar
 * @param {string} [props.className] - Additional CSS classes for the track
 * @param {string} [props.indicatorClassName] - Additional CSS classes for the indicator
 * @returns {React.ReactElement}
 *
 * @example
 * // Determinate progress
 * <Progress value={60} max={100} />
 *
 * @example
 * // Indeterminate loading state
 * <Progress />
 */
export function Progress({
    value,
    max = 100,
    className,
    indicatorClassName,
    ...props
}) {
    const percentage = value != null ? Math.min(Math.max((value / max) * 100, 0), 100) : null;
    const isIndeterminate = percentage === null;

    return (
        <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={isIndeterminate ? undefined : value}
            aria-valuetext={isIndeterminate ? 'Loading' : `${Math.round(percentage)}%`}
            className={cn(
                'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    'h-full bg-primary transition-all duration-300',
                    isIndeterminate && 'w-1/3 animate-[progress_1s_ease-in-out_infinite]',
                    indicatorClassName
                )}
                style={isIndeterminate ? undefined : { width: `${percentage}%` }}
            />
        </div>
    );
}
