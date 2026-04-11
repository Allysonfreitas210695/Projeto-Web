import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'academic' | 'status' | 'info';
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant = 'academic', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center py-1.5 px-3 rounded-lg font-medium text-sm',
          {
            'bg-tertiary-fixed text-on-tertiary-fixed': variant === 'academic',
            'bg-secondary-container text-on-secondary rounded-full': variant === 'status',
            'bg-surface-container-high text-on-surface-variant': variant === 'info',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Chip.displayName = 'Chip';
