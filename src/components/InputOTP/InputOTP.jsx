import React, { useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export function InputOTP({
    length = 6,
    value = '',
    onChange,
    onComplete,
    className,
    ...props
}) {
    const [otp, setOtp] = useState(value.split(''));
    const inputRefs = useRef([]);

    const handleChange = (index, val) => {
        const newOtp = [...otp];
        newOtp[index] = val.slice(-1); // Only take last character
        setOtp(newOtp);

        const otpString = newOtp.join('');
        onChange?.(otpString);

        // Auto-focus next input
        if (val && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check if complete
        if (otpString.length === length && !otpString.includes('')) {
            onComplete?.(otpString);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);
        const newOtp = pastedData.split('').concat(Array(length).fill('')).slice(0, length);
        setOtp(newOtp);
        onChange?.(newOtp.join(''));

        // Focus last filled input or first empty
        const nextIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[nextIndex]?.focus();

        if (newOtp.join('').length === length) {
            onComplete?.(newOtp.join(''));
        }
    };

    return (
        <div className={cn('flex gap-2', className)} {...props}>
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-10 h-12 text-center text-lg font-semibold border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            ))}
        </div>
    );
}
