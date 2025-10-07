import { useRef, useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface ControlPoint {
  cp1: { x: number; y: number };
  cp2: { x: number; y: number };
  pointB: { x: number; y: number };
  num: number;
  time: number;
}

interface Startxy {
  xvalue: string;
  yvalue: string;
}

interface GameVisualProps {
  currentMultiplier: number;
  timer5: number;
  onCashout: (multiplier: number) => void;
  dude55: boolean;
  dude56: string;
  betAmount: string;
  Gametimeremaining: number;
  GameStatus: string;
  tValues: { number: number; color: string; svg: string }[];
}

type Keyframe = Point[];

const BezierAnimation: React.FC<GameVisualProps> = ({
  Gametimeremaining,
  GameStatus,
  currentMultiplier,
  dude55,
  dude56,
  betAmount,
  tValues,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointBRef = useRef<Point>({ x: 10, y: 190 });
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]);
  const [transitionDurations, setTransitionDurations] = useState<number[]>([]);
  const [startxy, setStartxy] = useState<Startxy | null>(null);

  useEffect(() => {
    async function fetchStartxy() {
      try {
        const response = await fetch('/api/coordinates?uniqueName=backgroundimage');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Startxy = await response.json();
        setStartxy(data);
        pointBRef.current = {
          x: parseInt(data.xvalue, 10),
          y: parseInt(data.yvalue, 10),
        };
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        setStartxy(null);
        pointBRef.current = { x: 10, y: 190 };
      }
    }
    fetchStartxy();
  }, []);

  useEffect(() => {
    async function fetchControlPoints() {
      try {
        const response = await fetch('/api/bezier');
        const data = await response.json();
        if (!data || !data.frames) return;

        const startPoint = pointBRef.current;

        const newKeyframes: Keyframe[] = data.frames.map((frame: ControlPoint) => [
          startPoint, // pointA (starting point from /api/coordinates)
          frame.cp1, // control point 1
          frame.cp2, // control point 2
          frame.pointB, // end point
        ]);

        const newTransitionDurations: number[] = data.frames
          .filter((frame: ControlPoint) => frame.time > 0)
          .map((frame: ControlPoint) => frame.time);

        setKeyframes(newKeyframes);
        setTransitionDurations(newTransitionDurations);
      } catch (error) {
        console.error('Error fetching control points:', error);
      }
    }
    fetchControlPoints();
  }, [startxy]); // Re-fetch when startxy changes

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || keyframes.length === 0) return;

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
      const elapsed = time - startTime; // in milliseconds

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
  }, [keyframes, transitionDurations]);

  return (
    <div className="relative h-64 bg-black overflow-hidden mb-4">
      <div className="absolute inset-0">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="w-full h-full"
          style={{
            zIndex: 100,
          }}
        />
      </div>
    </div>
  );
};

export default BezierAnimation;