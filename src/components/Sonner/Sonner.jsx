import React from 'react';
import { Toaster as SonnerToaster, toast } from 'sonner';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

/**
 * Toaster - Toast notification container using Sonner library
 *
 * Place this component once in your app layout to enable toast notifications.
 * Use the exported `toast` function to trigger notifications.
 *
 * @param {Object} props - Component props
 * @param {'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'} [props.position='bottom-right'] - Toast position
 * @param {boolean} [props.expand=false] - Expand toasts by default
 * @param {boolean} [props.richColors=false] - Use rich colors for different toast types
 * @param {boolean} [props.closeButton=false] - Show close button on toasts
 * @param {Object} [props.theme] - Custom theme overrides for toast type classes
 * @param {Object} [props.icons] - Custom icons for toast types (success, error, warning, info)
 * @returns {React.ReactElement}
 *
 * @example
 * // In your App layout:
 * <Toaster position="top-right" closeButton />
 *
 * // To show toasts:
 * import { toast } from '@/components/Sonner';
 * toast.success('Changes saved!');
 * toast.error('Something went wrong');
 * toast.warning('Please check your input');
 * toast.info('New features available');
 */

// Default theme with left border accent (! prefix required to override sonner defaults)
const defaultTheme = {
    success: '!border-l-4 !border-l-green-500 dark:!border-l-green-400',
    error: '!border-l-4 !border-l-red-500 dark:!border-l-red-400',
    warning: '!border-l-4 !border-l-yellow-500 dark:!border-l-yellow-400',
    info: '!border-l-4 !border-l-blue-500 dark:!border-l-blue-400',
};

// Default colored icons for each toast type
const defaultIcons = {
    success: <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />,
    error: <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />,
    warning: <AlertTriangle className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />,
    info: <Info className="h-4 w-4 text-blue-500 dark:text-blue-400" />,
};

export function Toaster({
    position = 'bottom-right',
    expand = false,
    richColors = false,
    closeButton = false,
    theme = defaultTheme,
    icons = defaultIcons,
    ...props
}) {
    // Merge custom theme with defaults
    const mergedTheme = { ...defaultTheme, ...theme };
    const mergedIcons = { ...defaultIcons, ...icons };

    return (
        <SonnerToaster
            position={position}
            expand={expand}
            richColors={richColors}
            closeButton={closeButton}
            icons={mergedIcons}
            toastOptions={{
                classNames: {
                    toast:
                        'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                    title: 'group-[.toast]:text-foreground group-[.toast]:font-semibold',
                    description: 'group-[.toast]:text-muted-foreground',
                    actionButton:
                        'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                    cancelButton:
                        'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                    closeButton:
                        'group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-border',
                    success: mergedTheme.success,
                    error: mergedTheme.error,
                    warning: mergedTheme.warning,
                    info: mergedTheme.info,
                },
            }}
            {...props}
        />
    );
}

// Re-export toast function for convenience
export { toast };
