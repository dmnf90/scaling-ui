import { useEffect } from 'react';

/**
 * Hook for handling Escape key press
 * @param {Function} handler - Callback when Escape is pressed (receives event)
 * @param {boolean} enabled - Whether the hook is active (default: true)
 */
export function useEscapeKey(handler, enabled = true) {
    useEffect(() => {
        if (!enabled) return;

        const listener = (e) => {
            if (e.key === 'Escape') {
                handler(e);
            }
        };

        document.addEventListener('keydown', listener);
        return () => document.removeEventListener('keydown', listener);
    }, [handler, enabled]);
}
