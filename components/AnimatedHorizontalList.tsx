import React, { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  timerMs: number;       // how long to animate for (e.g., 5000ms)
  distance: number;      // how many pixels to move (e.g., 200px to the right)
};

export default function AnimatedHorizontalList({ children, timerMs, distance }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) {
        setStartTime(timestamp);
        frameId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / timerMs, 1); // 0 to 1
      const left = progress * distance;

      if (ref.current) {
        ref.current.style.left = `${left}px`;
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [timerMs, distance]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: '180px',
        left: '0px',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      {children}
    </div>
  );
}
