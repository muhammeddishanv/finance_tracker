import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] ${className}`}>
      {children}
    </div>
  );
}
