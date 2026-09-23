import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  showCount?: boolean;
}

const Rating: React.FC<RatingProps> = ({ value, count, size = 14, showCount = true }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(value)
                ? 'fill-[#0B0B0B] text-[#0B0B0B]'
                : 'fill-[#E5E5E3] text-[#E5E5E3]'
            }
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-[#A1A1A1] font-medium">({count})</span>
      )}
    </div>
  );
};

export default Rating;
