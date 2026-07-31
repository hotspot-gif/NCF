"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  description?: string;
}

const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
const ratingColors = [
  "",
  "bg-red-100 text-red-600",
  "bg-orange-100 text-orange-600",
  "bg-yellow-100 text-yellow-700",
  "bg-emerald-100 text-emerald-600",
  "bg-accent-green/15 text-accent-green",
];

export default function StarRating({
  value,
  onChange,
  label,
  description,
}: StarRatingProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-primary mb-0.5">
        {label}
      </label>
      {description && (
        <p className="text-[11px] text-slate-400 mb-2">{description}</p>
      )}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="star-btn p-0.5 focus:outline-none"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              size={30}
              className={
                star <= value
                  ? "fill-star-gold text-star-gold drop-shadow-sm"
                  : "fill-none text-slate-200"
              }
            />
          </button>
        ))}
        {value > 0 && (
          <span
            className={`ml-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${ratingColors[value]}`}
          >
            {ratingLabels[value]}
          </span>
        )}
      </div>
    </div>
  );
}
