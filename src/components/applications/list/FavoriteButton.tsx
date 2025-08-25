import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { FloatingHearts } from "./FloatingHearts";

interface FavoriteButtonProps {
  isFavorite: boolean;
  isAnimating: boolean;
  showFloatingHearts: boolean;
  onToggle: () => void;
}

export function FavoriteButton({
  isFavorite,
  isAnimating,
  showFloatingHearts,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="p-2 h-9 w-9 relative overflow-visible rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
      >
        <Heart
          size={16}
          className={`transition-all duration-300 ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-400"
          } ${isAnimating ? "animate-bounce scale-125" : ""}`}
          style={{
            filter: isAnimating
              ? "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))"
              : "",
          }}
        />

        {/* Pulse effect on click */}
        {isAnimating && (
          <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
        )}
      </Button>

      {/* Floating hearts animation */}
      <FloatingHearts isVisible={showFloatingHearts} />
    </div>
  );
}
