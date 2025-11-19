import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const switchVariants = cva(
    'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            checked: {
                true: 'bg-primary',
                false: 'bg-input',
            },
        },
        defaultVariants: {
            checked: false,
        },
    }
);

const switchThumbVariants = cva(
    'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
    {
        variants: {
            checked: {
                true: 'translate-x-5',
                false: 'translate-x-0',
            },
        },
        defaultVariants: {
            checked: false,
        },
    }
);

export const Switch = React.forwardRef(({
    className,
    checked = false,
    disabled = false,
    ...props
}, ref) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            className={cn(switchVariants({ checked }), className)}
            ref={ref}
            {...props}
        >
            <span className={switchThumbVariants({ checked })} />
        </button>
    );
});

Switch.displayName = 'Switch';
