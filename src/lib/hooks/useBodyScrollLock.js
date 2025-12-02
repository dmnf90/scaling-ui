import { useEffect } from 'react';

/**
 * Hook for locking body scroll (prevents scrolling when modal is open)
 * @param {boolean} locked - Whether to lock the body scroll
 */
export function useBodyScrollLock(locked) {
    useEffect(() => {
        if (!locked) return;

        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [locked]);
}
