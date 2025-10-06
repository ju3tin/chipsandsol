import { useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

type Keyframe = Point[];

const keyframes: Keyframe[] = [
  [
    { x: 0, y: 200 },
    { x: 50, y: 120 },
    { x: 115, y: 141 },
    { x: 133, y: 135 },
  ],
  [
    { x: 0, y: 200 },
    { x: 134, y: 131 },
    { x: 269, y: 66 },
    { x: 400, y: 0 },
  ],
  [
    { x: 0, y: 200 },
    { x: 134, y: 131 },
    { x: 269, y: 66 },
    { x: 400, y: 0 },
  ],
];

const transitionDurations: number[] = [10, 10]; // Durations in seconds between keyframes (length should be keyframes.length - 1)

const BezierAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const draw = (points: Point[]) => {
      ctx.clearRect(0, 0, 400, 200);

      // Draw the Bezier curve
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.bezierCurveTo(
        points[1].x,
        points[1].y,
        points[2].x,
        points[2].y,
        points[3].x,
        points[3].y
      );
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw points as small circles
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
      });
    };

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000; // in seconds

      // Find the current keyframe segment
      let cumulativeTime = 0;
      let segmentIndex = 0;
      for (; segmentIndex < transitionDurations.length; segmentIndex++) {
        if (elapsed < cumulativeTime + transitionDurations[segmentIndex]) {
          break;
        }
        cumulativeTime += transitionDurations[segmentIndex];
      }

      if (segmentIndex === transitionDurations.length) {
        // At or beyond the last keyframe, draw the final one and continue
        draw(keyframes[keyframes.length - 1]);
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Interpolate between current and next keyframe
      const t = (elapsed - cumulativeTime) / transitionDurations[segmentIndex];
      const currentPoints: Point[] = keyframes[segmentIndex].map((p, i) => ({
        x: p.x + t * (keyframes[segmentIndex + 1][i].x - p.x),
        y: p.y + t * (keyframes[segmentIndex + 1][i].y - p.y),
      }));

      draw(currentPoints);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
      className="w-full h-full"
      style={{
        zIndex: 100,
      }}
    />
  );
};

export default BezierAnimation;