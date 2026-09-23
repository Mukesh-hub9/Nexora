import React from 'react';

type BadgeVariant = 'NEW' | 'BEST SELLER' | 'SALE' | 'LIMITED';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  NEW: 'bg-[#4F7FFF] text-white',
  'BEST SELLER': 'bg-[#0B0B0B] text-white',
  SALE: 'bg-red-500 text-white',
  LIMITED: 'bg-[#7C3AED] text-white',
};

const Badge: React.FC<BadgeProps> = ({ variant, className = '' }) => {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full ${variantStyles[variant]} ${className}`}
    >
      {variant}
    </span>
  );
};

export default Badge;
