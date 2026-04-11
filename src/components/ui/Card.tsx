import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'tonal' | 'academic' | 'status' | 'inverse';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6',
          {
            'bg-surface-container-lowest': variant === 'default',
            'bg-surface-container-lowest card-elevated': variant === 'elevated',
            'bg-surface-container-low': variant === 'tonal',
            'bg-tertiary-fixed text-on-tertiary-fixed': variant === 'academic',
            'bg-error-container/30 border border-error/20': variant === 'status',
            'bg-inverse-surface text-inverse-on-surface': variant === 'inverse',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
