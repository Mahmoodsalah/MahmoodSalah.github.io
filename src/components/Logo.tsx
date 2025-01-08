import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = 'h-8 w-auto' }: LogoProps) {
  return (
    <div className={`${className} relative`}>
      <img
        src="/logo.png"
        alt="Mahmood Salah Logo"
        className="w-full h-full object-contain"
        loading="eager"
      />
    </div>
  );
}