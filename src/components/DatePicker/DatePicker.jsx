import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover/Popover';
import { Calendar } from '../Calendar/Calendar';
import { Button } from '../Button/Button';

/**
 * DatePicker - A date selection component with popover calendar
 *
 * @param {Object} props - Component props
 * @param {Date} [props.selected] - Currently selected date
 * @param {function} [props.onSelect] - Callback when date is selected, receives the Date object
 * @param {string} [props.placeholder='Pick a date'] - Placeholder text when no date is selected
 * @param {string} [props.dateFormat='PPP'] - Date-fns format string for displaying the date
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * const [date, setDate] = useState(null);
 *
 * <DatePicker
 *     selected={date}
 *     onSelect={setDate}
 *     placeholder="Select a date"
 * />
 *
 * @example
 * // Custom date format
 * <DatePicker selected={date} onSelect={setDate} dateFormat="MM/dd/yyyy" />
 */
export function DatePicker({
    selected,
    onSelect,
    placeholder = 'Pick a date',
    dateFormat = 'PPP',
    className,
    ...props
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !selected && 'text-muted-foreground',
                        className
                    )}
                    {...props}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selected ? format(selected, dateFormat) : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                    className={cn('min-w-[300px]')}
                    selected={selected}
                    onSelect={onSelect}
                />
            </PopoverContent>
        </Popover>
    );
}
