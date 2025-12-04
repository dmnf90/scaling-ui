import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Carousel - A slideshow component with touch/drag support
 *
 * Sub-components:
 * - CarouselContent: Container for carousel items
 * - CarouselItem: Individual slide
 * - CarouselPrevious: Previous slide button
 * - CarouselNext: Next slide button
 * - CarouselDots: Dot navigation indicators
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.autoPlay=false] - Auto-advance slides
 * @param {number} [props.interval=5000] - Auto-play interval in ms
 * @param {boolean} [props.loop=true] - Loop back to start/end
 * @param {React.ReactNode} [props.children] - Carousel sub-components
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Carousel autoPlay interval={3000}>
 *     <CarouselContent>
 *         <CarouselItem><img src="/slide1.jpg" /></CarouselItem>
 *         <CarouselItem><img src="/slide2.jpg" /></CarouselItem>
 *     </CarouselContent>
 *     <CarouselPrevious />
 *     <CarouselNext />
 *     <CarouselDots />
 * </Carousel>
 */
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

/**
 * CarouselContent - Container for carousel items with drag support
 */
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
    const startY = useRef(0);
    const currentX = useRef(0);
    const isHorizontalSwipe = useRef(null); // null = undetermined, true = horizontal, false = vertical
    const isDraggingRef = useRef(false); // Ref version for event listeners

    useEffect(() => {
        setItemCount?.(items.length);
    }, [items.length, setItemCount]);

    // Mouse events
    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        isDraggingRef.current = true;
        startX.current = e.clientX;
        startY.current = e.clientY;
        currentX.current = e.clientX;
        isHorizontalSwipe.current = null;
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;

        // Determine swipe direction on first significant movement
        if (isHorizontalSwipe.current === null) {
            const deltaX = Math.abs(e.clientX - startX.current);
            const deltaY = Math.abs(e.clientY - startY.current);
            const threshold = 5;

            if (deltaX > threshold || deltaY > threshold) {
                isHorizontalSwipe.current = deltaX > deltaY;
            }
        }

        if (isHorizontalSwipe.current === false) return;

        currentX.current = e.clientX;
        const diff = currentX.current - startX.current;
        const containerWidth = containerRef.current?.offsetWidth || 1;
        const offsetPercent = (diff / containerWidth) * 100;
        setDragOffset(offsetPercent);
    };

    const handleMouseUp = () => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsDragging(false);

        if (isHorizontalSwipe.current !== false) {
            const threshold = 15;

            if (dragOffset < -threshold) {
                if (loop || currentIndex < itemCount - 1) {
                    onNext?.();
                }
            } else if (dragOffset > threshold) {
                if (loop || currentIndex > 0) {
                    onPrevious?.();
                }
            }
        }

        setDragOffset(0);
        isHorizontalSwipe.current = null;
    };

    const handleMouseLeave = () => {
        if (isDraggingRef.current) {
            handleMouseUp();
        }
    };

    // Native touch event listeners with { passive: false } for touchmove
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e) => {
            isDraggingRef.current = true;
            setIsDragging(true);
            startX.current = e.touches[0].clientX;
            startY.current = e.touches[0].clientY;
            currentX.current = e.touches[0].clientX;
            isHorizontalSwipe.current = null;
        };

        const handleTouchMove = (e) => {
            if (!isDraggingRef.current) return;

            const clientX = e.touches[0].clientX;
            const clientY = e.touches[0].clientY;

            // Determine swipe direction on first significant movement
            if (isHorizontalSwipe.current === null) {
                const deltaX = Math.abs(clientX - startX.current);
                const deltaY = Math.abs(clientY - startY.current);
                const threshold = 5;

                if (deltaX > threshold || deltaY > threshold) {
                    isHorizontalSwipe.current = deltaX > deltaY;
                }
            }

            // Prevent vertical scrolling when swiping horizontally
            if (isHorizontalSwipe.current === true) {
                e.preventDefault();
            }

            if (isHorizontalSwipe.current === false) return;

            currentX.current = clientX;
            const diff = currentX.current - startX.current;
            const containerWidth = container.offsetWidth || 1;
            const offsetPercent = (diff / containerWidth) * 100;
            setDragOffset(offsetPercent);
        };

        const handleTouchEnd = () => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            setIsDragging(false);

            if (isHorizontalSwipe.current !== false) {
                const threshold = 15;
                const currentDragOffset = ((currentX.current - startX.current) / (container.offsetWidth || 1)) * 100;

                if (currentDragOffset < -threshold) {
                    if (loop || currentIndex < itemCount - 1) {
                        onNext?.();
                    }
                } else if (currentDragOffset > threshold) {
                    if (loop || currentIndex > 0) {
                        onPrevious?.();
                    }
                }
            }

            setDragOffset(0);
            isHorizontalSwipe.current = null;
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [loop, currentIndex, itemCount, onNext, onPrevious]);

    const translateX = -currentIndex * 100 + dragOffset;

    return (
        <div
            ref={containerRef}
            className={cn('overflow-hidden', className)}
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

/**
 * CarouselItem - Individual carousel slide
 */
export function CarouselItem({ className, children, ...props }) {
    return (
        <div className={cn('', className)} {...props}>
            {children}
        </div>
    );
}

/**
 * CarouselPrevious - Previous slide navigation button
 */
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

/**
 * CarouselNext - Next slide navigation button
 */
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

/**
 * CarouselDots - Dot navigation indicators for carousel slides
 */
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
