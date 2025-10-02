import { useState, useEffect } from 'react';

type Props = {
  startMarginBottom?: number;
  endMarginBottom?: number;
  duration?: number;
};

export default function XLabels({
  startMarginBottom = 10,
  endMarginBottom = 2,
  duration = 2000,
}: Props) {
  // State to toggle animation
  const [isAnimating, setIsAnimating] = useState(false);

  // List of multiplier values
  const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Trigger animation on mount
  useEffect(() => {
    // Start animation after a brief delay to ensure initial render
    const timeout = setTimeout(() => {
      setIsAnimating(true);
    }, 0);

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  return (
    <span
      style={{
        top: '0px',
        left: '0px',
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block',
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
        {multipliers.map((multiplier) => (
          <li
            key={multiplier}
            style={{
              marginBottom: isAnimating ? `${endMarginBottom}px` : `${startMarginBottom}px`,
              transition: `margin-bottom ${duration}ms ease-out`,
            }}
          >
            {multiplier}x
          </li>
        ))}
      </ul>
    </span>
  );
}