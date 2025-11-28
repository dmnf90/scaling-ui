import React from 'react';
import { Toaster as SonnerToaster, toast } from 'sonner';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

// Default theme with left border accent (! prefix required to override sonner defaults)
const defaultTheme = {
    success: '!border-l-4 !border-l-green-500',
    error: '!border-l-4 !border-l-red-500',
    warning: '!border-l-4 !border-l-yellow-500',
    info: '!border-l-4 !border-l-blue-500',
};

// Default colored icons for each toast type
const defaultIcons = {
    success: <CheckCircle className="h-4 w-4 text-green-500" />,
    error: <XCircle className="h-4 w-4 text-red-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    info: <Info className="h-4 w-4 text-blue-500" />,
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
