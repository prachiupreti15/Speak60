import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-mono font-bold uppercase tracking-widest border-2 border-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-red-600 text-white shadow-sharp hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none',
    secondary: 'bg-black text-white shadow-sharp hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none',
    outline: 'bg-white text-black shadow-sharp hover:bg-gray-100',
    ghost: 'bg-transparent text-black border-transparent hover:bg-black hover:text-white',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-xs px-5 py-2.5',
    lg: 'text-sm px-8 py-4',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}