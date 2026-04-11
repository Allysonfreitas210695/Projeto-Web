import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          {
            'bg-gradient-primary text-white rounded-xl shadow-none hover:opacity-90 active:opacity-80':
              variant === 'primary',
            'bg-secondary-container text-on-secondary rounded-xl hover:opacity-90 active:opacity-80':
              variant === 'secondary',
            'bg-transparent text-primary rounded-xl hover:bg-surface-container-high active:bg-surface-container-low':
              variant === 'tertiary',
            'bg-transparent text-on-surface-variant rounded-xl hover:bg-surface-container-high':
              variant === 'ghost',
          },
          {
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-12 px-8 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
