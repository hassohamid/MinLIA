import { useState } from "react";

export function useHeartAnimations() {
  const [heartAnimations, setHeartAnimations] = useState<{
    [key: string]: boolean;
  }>({});
  const [floatingHearts, setFloatingHearts] = useState<{
    [key: string]: boolean;
  }>({});

  const triggerHeartAnimation = (id: number, showFloating = false) => {
    // Trigger heart animation
    setHeartAnimations((prev) => ({ ...prev, [id]: true }));

    if (showFloating) {
      setFloatingHearts((prev) => ({ ...prev, [id]: true }));

      // Remove floating hearts after animation
      setTimeout(() => {
        setFloatingHearts((prev) => ({ ...prev, [id]: false }));
      }, 1000);
    }

    // Remove heart animation after duration
    setTimeout(() => {
      setHeartAnimations((prev) => ({ ...prev, [id]: false }));
    }, 600);
  };

  return {
    heartAnimations,
    floatingHearts,
    triggerHeartAnimation,
  };
}
