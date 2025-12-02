import { useEffect } from 'react';

/**
 * Hook for detecting clicks outside of an element
 * @param {React.RefObject} ref - Ref to the element to detect clicks outside of
 * @param {Function} handler - Callback when click outside is detected
 * @param {boolean} enabled - Whether the hook is active (default: true)
 */
export function useClickOutside(ref, handler, enabled = true) {
    useEffect(() => {
        if (!enabled) return;

        const listener = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler(e);
            }
        };

        document.addEventListener('mousedown', listener);
        return () => document.removeEventListener('mousedown', listener);
    }, [ref, handler, enabled]);
}
