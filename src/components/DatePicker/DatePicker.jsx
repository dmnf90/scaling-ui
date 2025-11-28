import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover/Popover';
import { Calendar } from '../Calendar/Calendar';
import { Button } from '../Button/Button';

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
