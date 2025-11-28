import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Carousel({
    autoPlay = false,
    interval = 5000,
    loop = true,
    className,
    children,
    ...props
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => {
            if (prev >= itemCount - 1) {
                return loop ? 0 : prev;
            }
            return prev + 1;
        });
    }, [itemCount, loop]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => {
            if (prev <= 0) {
                return loop ? itemCount - 1 : prev;
            }
            return prev - 1;
        });
    }, [itemCount, loop]);

    const goToIndex = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    useEffect(() => {
        if (!autoPlay || itemCount <= 1) return;

        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, goToNext, itemCount]);

    return (
        <div className={cn('relative', className)} {...props}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    if (child.type === CarouselContent) {
                        return React.cloneElement(child, {
                            currentIndex,
                            setItemCount,
                            onNext: goToNext,
                            onPrevious: goToPrevious,
                            loop,
                            itemCount,
                        });
                    }
                    if (child.type === CarouselPrevious) {
                        return React.cloneElement(child, {
                            onClick: goToPrevious,
                            disabled: !loop && currentIndex === 0,
                        });
                    }
                    if (child.type === CarouselNext) {
                        return React.cloneElement(child, {
                            onClick: goToNext,
                            disabled: !loop && currentIndex >= itemCount - 1,
                        });
                    }
                    if (child.type === CarouselDots) {
                        return React.cloneElement(child, {
                            currentIndex,
                            itemCount,
                            onDotClick: goToIndex,
                        });
                    }
                }
                return child;
            })}
        </div>
    );
}

export function CarouselContent({
    currentIndex = 0,
    setItemCount,
    onNext,
    onPrevious,
    loop,
    itemCount,
    className,
    children,
    ...props
}) {
    const items = React.Children.toArray(children);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const startX = useRef(0);
    const currentX = useRef(0);

    useEffect(() => {
        setItemCount?.(items.length);
    }, [items.length, setItemCount]);

    const handleDragStart = (clientX) => {
        setIsDragging(true);
        startX.current = clientX;
        currentX.current = clientX;
    };

    const handleDragMove = (clientX) => {
        if (!isDragging) return;
        currentX.current = clientX;
        const diff = currentX.current - startX.current;
        const containerWidth = containerRef.current?.offsetWidth || 1;
        const offsetPercent = (diff / containerWidth) * 100;
        setDragOffset(offsetPercent);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 15; // percent of container width

        if (dragOffset < -threshold) {
            // Swiped left - go to next
            if (loop || currentIndex < itemCount - 1) {
                onNext?.();
            }
        } else if (dragOffset > threshold) {
            // Swiped right - go to previous
            if (loop || currentIndex > 0) {
                onPrevious?.();
            }
        }

        setDragOffset(0);
    };

    // Touch events
    const handleTouchStart = (e) => {
        handleDragStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        handleDragMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        handleDragEnd();
    };

    // Mouse events
    const handleMouseDown = (e) => {
        e.preventDefault();
        handleDragStart(e.clientX);
    };

    const handleMouseMove = (e) => {
        handleDragMove(e.clientX);
    };

    const handleMouseUp = () => {
        handleDragEnd();
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleDragEnd();
        }
    };

    const translateX = -currentIndex * 100 + dragOffset;

    return (
        <div
            ref={containerRef}
            className={cn('overflow-hidden', className)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <div
                className={cn(
                    'flex',
                    !isDragging && 'transition-transform duration-300 ease-in-out'
                )}
                style={{
                    transform: `translateX(${translateX}%)`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
            >
                {items.map((child, index) => (
                    <div key={index} className="w-full flex-shrink-0 select-none">
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function CarouselItem({ className, children, ...props }) {
    return (
        <div className={cn('', className)} {...props}>
            {children}
        </div>
    );
}

export function CarouselPrevious({
    onClick,
    disabled,
    className,
    children,
    ...props
}) {
    return (
        <button
            type="button"
            className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50',
                className
            )}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children || <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">Previous slide</span>
        </button>
    );
}

export function CarouselNext({
    onClick,
    disabled,
    className,
    children,
    ...props
}) {
    return (
        <button
            type="button"
            className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50',
                className
            )}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children || <ChevronRight className="h-4 w-4" />}
            <span className="sr-only">Next slide</span>
        </button>
    );
}

export function CarouselDots({
    currentIndex = 0,
    itemCount = 0,
    onDotClick,
    className,
    ...props
}) {
    if (itemCount <= 1) return null;

    return (
        <div
            className={cn('flex justify-center gap-2 mt-4', className)}
            {...props}
        >
            {Array.from({ length: itemCount }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    className={cn(
                        'h-2 w-2 rounded-full transition-colors',
                        index === currentIndex
                            ? 'bg-primary'
                            : 'bg-primary/30 hover:bg-primary/50'
                    )}
                    onClick={() => onDotClick?.(index)}
                >
                    <span className="sr-only">Go to slide {index + 1}</span>
                </button>
            ))}
        </div>
    );
}
