import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export function Slider({
    min = 0,
    max = 100,
    step = 1,
    value = [50],
    onValueChange,
    className,
    disabled = false,
    ...props
}) {
    const [internalValue, setInternalValue] = useState(value);
    const currentValue = value || internalValue;

    const handleChange = (e, index = 0) => {
        const newValue = [...currentValue];
        newValue[index] = Number(e.target.value);

        // Sort values for dual handle
        if (newValue.length > 1) {
            newValue.sort((a, b) => a - b);
        }

        setInternalValue(newValue);
        onValueChange?.(newValue);
    };

    const percentage = (val) => ((val - min) / (max - min)) * 100;

    return (
        <div className={cn('relative w-full', className)} {...props}>
            <div className="relative h-2 w-full">
                {/* Track */}
                <div className="absolute w-full h-2 bg-secondary rounded-full" />

                {/* Range */}
                {currentValue.length === 1 ? (
                    <div
                        className="absolute h-2 bg-primary rounded-full"
                        style={{
                            left: 0,
                            right: `${100 - percentage(currentValue[0])}%`,
                        }}
                    />
                ) : (
                    <div
                        className="absolute h-2 bg-primary rounded-full"
                        style={{
                            left: `${percentage(currentValue[0])}%`,
                            right: `${100 - percentage(currentValue[1])}%`,
                        }}
                    />
                )}

                {/* Handles */}
                {currentValue.map((val, index) => (
                    <input
                        key={index}
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={val}
                        onChange={(e) => handleChange(e, index)}
                        disabled={disabled}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-colors [&::-webkit-slider-thumb]:hover:bg-primary/10 [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-2 [&::-webkit-slider-thumb]:focus:ring-ring [&::-webkit-slider-thumb]:focus:ring-offset-2 [&::-webkit-slider-thumb]:disabled:pointer-events-none [&::-webkit-slider-thumb]:disabled:opacity-50 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-colors [&::-moz-range-thumb]:hover:bg-primary/10"
                    />
                ))}
            </div>
        </div>
    );
}
