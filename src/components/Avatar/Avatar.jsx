import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { User } from 'lucide-react';

const avatarVariants = cva(
    'relative inline-flex items-center justify-center overflow-hidden bg-muted',
    {
        variants: {
            size: {
                sm: 'h-8 w-8 text-xs',
                md: 'h-10 w-10 text-sm',
                lg: 'h-12 w-12 text-base',
                xl: 'h-16 w-16 text-lg',
            },
            variant: {
                circular: 'rounded-full',
                square: 'rounded-md',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'circular',
        },
    }
);

const statusVariants = cva(
    'absolute border-1 border-background rounded-full',
    {
        variants: {
            size: {
                sm: 'h-2 w-2 bottom-1 right-1',
                md: 'h-2.5 w-2.5 bottom-1 right-1',
                lg: 'h-3 w-3 bottom-1.5 right-0',
                xl: 'h-4 w-4 bottom-2 right-2',
            },
            status: {
                online: 'bg-green-500',
                offline: 'bg-gray-400',
                away: 'bg-yellow-500',
                busy: 'bg-red-500',
            },
        },
        defaultVariants: {
            size: 'md',
            status: 'online',
        },
    }
);

export const Avatar = React.forwardRef(function Avatar(
    {
        className,
        src,
        alt = '',
        fallback,
        size = 'md',
        variant = 'circular',
        status,
        showStatus = false,
        loading = false,
        ...props
    },
    ref
) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const renderFallback = () => {
        if (loading) {
            return (
                <div className="h-full w-full animate-pulse bg-muted-foreground/20" />
            );
        }

        if (fallback) {
            // If fallback is a string (initials), display it
            if (typeof fallback === 'string') {
                return (
                    <span className="font-medium text-muted-foreground uppercase">
                        {fallback}
                    </span>
                );
            }
            // If fallback is a React element, render it
            return fallback;
        }

        // Default fallback icon
        return <User className={cn(
            size === 'sm' && 'h-4 w-4',
            size === 'md' && 'h-5 w-5',
            size === 'lg' && 'h-6 w-6',
            size === 'xl' && 'h-8 w-8',
            'text-muted-foreground'
        )} />;
    };

    return (
        <div className="relative inline-block" ref={ref}>
            <div
                className={cn(avatarVariants({ size, variant }), className)}
                {...props}
            >
                {src && !imageError ? (
                    <>
                        <img
                            src={src}
                            alt={alt}
                            className={cn(
                                'h-full w-full object-cover',
                                !imageLoaded && 'opacity-0',
                                imageLoaded && 'opacity-100 transition-opacity'
                            )}
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                        />
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                {renderFallback()}
                            </div>
                        )}
                    </>
                ) : (
                    renderFallback()
                )}
            </div>
            {showStatus && status && (
                <span
                    className={cn(statusVariants({ size, status }))}
                    aria-label={`Status: ${status}`}
                />
            )}
        </div>
    );
});
