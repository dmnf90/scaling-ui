import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { User } from 'lucide-react';

/**
 * Avatar - User avatar with image, fallback, and status indicator
 *
 * @param {Object} props - Component props
 * @param {string} [props.src] - Image source URL
 * @param {string} [props.alt=''] - Alt text for the image
 * @param {string | React.ReactNode} [props.fallback] - Fallback content (initials string or custom element)
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Avatar size
 * @param {'circular' | 'square'} [props.variant='circular'] - Avatar shape
 * @param {'online' | 'offline' | 'away' | 'busy'} [props.status] - Status indicator type
 * @param {boolean} [props.showStatus=false] - Show status indicator
 * @param {boolean} [props.loading=false] - Show loading state
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * @returns {React.ReactElement}
 *
 * @example
 * // With image
 * <Avatar src="/avatar.jpg" alt="John Doe" />
 *
 * @example
 * // With initials fallback and status
 * <Avatar fallback="JD" status="online" showStatus />
 */

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
                online: 'bg-green-500 dark:bg-green-400',
                offline: 'bg-gray-400 dark:bg-gray-500',
                away: 'bg-yellow-500 dark:bg-yellow-400',
                busy: 'bg-red-500 dark:bg-red-400',
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
