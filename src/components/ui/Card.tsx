import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border-neo shadow-neo rounded-none p-6 ${className}`}>
      {children}
    </div>
  );
}
