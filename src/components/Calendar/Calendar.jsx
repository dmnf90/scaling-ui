import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select } from '../Select/Select';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    addMonths,
    subMonths,
    isSameMonth,
    isSameDay,
    isToday,
} from 'date-fns';

/**
 * Calendar - A date calendar component with month/year navigation
 *
 * @param {Object} props - Component props
 * @param {Date} [props.selected] - Currently selected date
 * @param {function} [props.onSelect] - Callback when a date is clicked, receives the Date object
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * const [date, setDate] = useState(null);
 *
 * <Calendar selected={date} onSelect={setDate} />
 *
 * @example
 * // Usually used inside DatePicker, but can be standalone
 * <Calendar
 *     selected={selectedDate}
 *     onSelect={(date) => console.log('Selected:', date)}
 * />
 */
export function Calendar({
    selected,
    onSelect,
    className,
    ...props
}) {
    const [currentMonth, setCurrentMonth] = useState(selected || new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = currentMonth.getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

    const handleMonthChange = (e) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(parseInt(e.target.value));
        setCurrentMonth(newMonth);
    };

    const handleYearChange = (e) => {
        const newMonth = new Date(currentMonth);
        newMonth.setFullYear(parseInt(e.target.value));
        setCurrentMonth(newMonth);
    };

    return (
        <div className={cn('p-3', className)} {...props}>
            {/* Header with navigation */}
            <div className="flex items-center justify-between mb-4">
                <button
                    type="button"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex gap-2">
                    <Select
                        value={currentMonth.getMonth()}
                        onChange={handleMonthChange}
                        className="h-8 w-auto"
                    >
                        {months.map((month, index) => (
                            <option key={month} value={index}>
                                {month}
                            </option>
                        ))}
                    </Select>

                    <Select
                        value={currentMonth.getFullYear()}
                        onChange={handleYearChange}
                        className="h-8 w-auto"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                </div>

                <button
                    type="button"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-medium text-muted-foreground py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                    const isSelected = selected && isSameDay(day, selected);
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isDayToday = isToday(day);

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onSelect?.(day)}
                            className={cn(
                                'h-9 w-9 text-center text-sm rounded-md transition-colors',
                                'hover:bg-accent hover:text-accent-foreground',
                                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                                !isCurrentMonth && 'text-muted-foreground opacity-50',
                                isSelected && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                                isDayToday && !isSelected && 'bg-accent font-semibold'
                            )}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
