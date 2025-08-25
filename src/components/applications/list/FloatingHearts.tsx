import { Heart } from "lucide-react";

interface FloatingHeartsProps {
  isVisible: boolean;
}

export function FloatingHearts({ isVisible }: FloatingHeartsProps) {
  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes floatHeart0 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -80px) rotate(15deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart1 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-20px, -60px) rotate(-10deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart2 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-70px, -70px) rotate(25deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart3 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-30px, -75px) rotate(-20deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart4 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-60px, -65px) rotate(30deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart5 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-40px, -85px) rotate(-15deg) scale(1); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            style={{
              animation: `floatHeart${i} 1s ease-out forwards`,
              animationDelay: `${i * 100}ms`,
            }}
          >
            <Heart size={12} className="fill-red-500 text-red-500" />
          </div>
        ))}
      </div>
    </>
  );
}
