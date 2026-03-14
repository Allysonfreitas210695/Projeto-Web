import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface PasswordInputProps {
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  className?: string;
  label?: string;
}

export const PasswordInput = ({
  register,
  error,
  placeholder,
  className,
  label = 'Senha',
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          {...register}
          type={show ? 'text' : 'password'}
          className={cn(
            'w-full h-11 pl-10 pr-10 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
          )}
          placeholder={placeholder || '••••••••'}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
          tabIndex={-1}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
};
