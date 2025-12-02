import { useState, useCallback } from 'react';

/**
 * Hook for managing controlled/uncontrolled state pattern
 * @param {Object} options
 * @param {*} options.defaultValue - Default value for uncontrolled mode
 * @param {*} options.value - Controlled value (undefined means uncontrolled)
 * @param {Function} options.onChange - Callback when value changes
 * @returns {[*, Function]} - Current value and setter function
 */
export function useControllableState({ defaultValue, value, onChange }) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;

    const setValue = useCallback((newValue) => {
        if (!isControlled) {
            setUncontrolledValue(newValue);
        }
        onChange?.(newValue);
    }, [isControlled, onChange]);

    return [currentValue, setValue];
}
