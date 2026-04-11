import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="label-md text-on-surface-variant mb-2 block">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              'w-full h-11 px-4 bg-surface-container-high text-on-surface rounded-lg outline-none transition-all duration-200 placeholder:text-on-surface-variant/50',
              'focus:ring-0',
              error
                ? 'bg-error-container text-on-error-container focus:border-b-2 focus:border-b-error'
                : 'focus:border-b-2 focus:border-b-primary',
              error && 'bg-error-container',
              className
            )}
            {...props}
          />
          <div
            className={cn(
              'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300',
              focused ? 'w-full' : 'w-0'
            )}
          />
        </div>
        {error && <p className="label-sm text-error mt-1.5">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
