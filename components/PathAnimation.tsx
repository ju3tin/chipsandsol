'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface PathAnimationProps {
  width?: number;
  height?: number;
  viewBoxSize?: { width: number; height: number };
}

export default function PathAnimation({
  width = 400,
  height = 300,
  viewBoxSize = { width: 400, height: 300 },
}: PathAnimationProps) {
  // MotionValues for cx and cy - these handle the keyframed animation
  const cx = useMotionValue(50);
  const cy = useMotionValue(250);

  useEffect(() => {
    // Keyframes for cx and cy (separate arrays for each property)
    const cxKeyframes = [50, 350, 300, 200]; // Start → straightEnd → curveEnd → bigCurveEnd
    const cyKeyframes = [250, 50, 100, 150];

    // Animate both MotionValues in parallel using global animate() - 3 args: target, keyframes, options
    animate(cx, cxKeyframes, {
      duration: 40, // Total duration (10s + 10s + 20s)
      times: [0, 0.25, 0.5, 1], // Normalized progress points
      ease: [
        'linear', // Straight segment
        [0.25, 0.46, 0.45, 0.94], // Gentle curve: smooth ease-out
        [0.68, -0.55, 0.265, 1.55], // Bigger curve: back-out/overshoot
      ],
    });

    animate(cy, cyKeyframes, {
      duration: 40,
      times: [0, 0.25, 0.5, 1],
      ease: [
        'linear',
        [0.25, 0.46, 0.45, 0.94],
        [0.68, -0.55, 0.265, 1.55],
      ],
    });
  }, [cx, cy]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex'}}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`}
        style={{ border: '1px solid #ccc' }}
      >
        {/* Optional: Visualize the full path for debugging */}
        <path
          d={`
            M 50 250  // Start
            L 350 50  // Straight line
            Q 350 50, 325 75, 300 100  // Gentle quadratic curve (approx cubic feel)
            C 300 100, 250 125, 200 150  // Bigger cubic curve (control points for overshoot)
          `}
          fill="none"
          stroke="gray"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        {/* Animated element: circle positioned via MotionValues */}
        <motion.circle
          cx={cx}
          cy={cy}
          r="10"
          fill="blue"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}