import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for calculating position of floating elements with viewport boundary checks
 * @param {React.RefObject} triggerRef - Ref to the trigger element
 * @param {React.RefObject} contentRef - Ref to the content element
 * @param {Object} options - Positioning options
 * @param {string} options.side - Side to position on ('top' | 'bottom' | 'left' | 'right')
 * @param {number} options.sideOffset - Offset from the trigger (default: 4)
 * @param {string} options.align - Alignment within side ('start' | 'center' | 'end')
 * @param {boolean} options.open - Whether the content is open
 * @returns {{ top: number, left: number }} - Position coordinates
 */
export function usePositioning(triggerRef, contentRef, {
    side = 'top',
    sideOffset = 4,
    align = 'center',
    open = false
}) {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const updatePosition = useCallback(() => {
        const trigger = triggerRef?.current;
        const content = contentRef?.current;
        if (!trigger || !content) return;

        const triggerRect = trigger.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (side) {
            case 'top':
                top = triggerRect.top - contentRect.height - sideOffset;
                left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                if (align === 'start') {
                    left = triggerRect.left;
                } else if (align === 'end') {
                    left = triggerRect.right - contentRect.width;
                }
                break;
            case 'bottom':
                top = triggerRect.bottom + sideOffset;
                left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                if (align === 'start') {
                    left = triggerRect.left;
                } else if (align === 'end') {
                    left = triggerRect.right - contentRect.width;
                }
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                left = triggerRect.left - contentRect.width - sideOffset;
                if (align === 'start') {
                    top = triggerRect.top;
                } else if (align === 'end') {
                    top = triggerRect.bottom - contentRect.height;
                }
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                left = triggerRect.right + sideOffset;
                if (align === 'start') {
                    top = triggerRect.top;
                } else if (align === 'end') {
                    top = triggerRect.bottom - contentRect.height;
                }
                break;
        }

        // Keep within viewport (8px margin)
        if (left + contentRect.width > window.innerWidth) {
            left = window.innerWidth - contentRect.width - 8;
        }
        if (left < 8) {
            left = 8;
        }
        if (top + contentRect.height > window.innerHeight) {
            top = window.innerHeight - contentRect.height - 8;
        }
        if (top < 8) {
            top = 8;
        }

        setPosition({ top, left });
    }, [triggerRef, contentRef, side, sideOffset, align]);

    useEffect(() => {
        if (!open) return;

        updatePosition();
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, [open, updatePosition]);

    return position;
}
