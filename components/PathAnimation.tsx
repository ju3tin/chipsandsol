'use client';

import React, { useRef, useEffect } from 'react';

const BezierCurve: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size with high-DPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(canvas.offsetWidth * dpr);
    canvas.height = Math.floor(canvas.offsetHeight * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const startPoint = { x: 0, y: canvas.height };
    const endPoint = { x: canvas.width, y: 0 };
    const controlPoint1 = { x: canvas.width * 0.3, y: canvas.height * 0.7 };
    const controlPoint2 = { x: canvas.width * 0.7, y: canvas.height * 0.3 };
    const controlPoint1Big = { x: canvas.width * 0.2, y: canvas.height * 0.9 };
    const controlPoint2Big = { x: canvas.width * 0.8, y: canvas.height * 0.1 };

    let startTime: number | null = null;

    const drawPoint = (x: number, y: number, color: string) => {
      ctx!.beginPath();
      ctx!.arc(x, y, 5, 0, 2 * Math.PI);
      ctx!.fillStyle = color;
      ctx!.fill();
    };

    const drawBezierCurve = (
      t: number,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      cp1: { x: number; y: number },
      cp2: { x: number; y: number }
    ) => {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      const x = uuu * p0.x + 3 * uu * t * cp1.x + 3 * u * tt * cp2.x + ttt * p1.x;
      const y = uuu * p0.y + 3 * uu * t * cp1.y + 3 * u * tt * cp2.y + ttt * p1.y;

      return { x, y };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // Time in seconds
      const totalDuration = 50; // 10s + 20s + 20s
      const cycleTime = Math.min(elapsed, totalDuration); // Clamp to finish after 50s

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate progress (t) and control points based on phase
      let t: number;
      let cp1x: number, cp1y: number, cp2x: number, cp2y: number;

      if (cycleTime <= 10) {
        // Linear phase (0-10s): Straight line
        t = cycleTime / 10;
        cp1x = startPoint.x;
        cp1y = startPoint.y;
        cp2x = endPoint.x;
        cp2y = endPoint.y;
      } else if (cycleTime <= 30) {
        // First Bezier curve phase (10-30s) with 20s transition
        t = (cycleTime - 10) / 20;
        const transitionProgress = Math.min((cycleTime - 10) / 20, 1);
        cp1x = lerp(startPoint.x, controlPoint1.x, transitionProgress);
        cp1y = lerp(startPoint.y, controlPoint1.y, transitionProgress);
        cp2x = lerp(endPoint.x, controlPoint2.x, transitionProgress);
        cp2y = lerp(endPoint.y, controlPoint2.y, transitionProgress);
      } else {
        // Larger Bezier curve phase (30-50s) with 20s transition
        t = (cycleTime - 30) / 20;
        const transitionProgress = Math.min((cycleTime - 30) / 20, 1);
        cp1x = lerp(controlPoint1.x, controlPoint1Big.x, transitionProgress);
        cp1y = lerp(controlPoint1.y, controlPoint1Big.y, transitionProgress);
        cp2x = lerp(controlPoint2.x, controlPoint2Big.x, transitionProgress);
        cp2y = lerp(controlPoint2.y, controlPoint2Big.y, transitionProgress);
      }

      // Draw the entire path up to the current point
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      for (let i = 0; i <= t; i += 0.01) {
        const point = drawBezierCurve(i, startPoint, endPoint, { x: cp1x, y: cp1y }, { x: cp2x, y: cp2y });
        ctx.lineTo(point.x, point.y);
      }

      const currentPoint = drawBezierCurve(t, startPoint, endPoint, { x: cp1x, y: cp1y }, { x: cp2x, y: cp2y });

      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw moving point
      drawPoint(currentPoint.x, currentPoint.y, 'red');

      // Draw control points for visualization
      if (cycleTime > 10 && cycleTime <= 30) {
        const transitionProgress = Math.min((cycleTime - 10) / 20, 1);
        drawPoint(
          lerp(startPoint.x, controlPoint1.x, transitionProgress),
          lerp(startPoint.y, controlPoint1.y, transitionProgress),
          'green'
        );
        drawPoint(
          lerp(endPoint.x, controlPoint2.x, transitionProgress),
          lerp(endPoint.y, controlPoint2.y, transitionProgress),
          'green'
        );
      } else if (cycleTime > 30) {
        const transitionProgress = Math.min((cycleTime - 30) / 20, 1);
        drawPoint(
          lerp(controlPoint1.x, controlPoint1Big.x, transitionProgress),
          lerp(controlPoint1.y, controlPoint1Big.y, transitionProgress),
          'purple'
        );
        drawPoint(
          lerp(controlPoint2.x, controlPoint2Big.x, transitionProgress),
          lerp(controlPoint2.y, controlPoint2Big.y, transitionProgress),
          'purple'
        );
      }

      if (cycleTime < totalDuration) {
        requestAnimationFrame(animate);
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.offsetWidth * dpr);
      canvas.height = Math.floor(canvas.offsetHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      startPoint.x = 0;
      startPoint.y = canvas.height;
      endPoint.x = canvas.width;
      endPoint.y = 0;
      controlPoint1.x = canvas.width * 0.3;
      controlPoint1.y = canvas.height * 0.7;
      controlPoint2.x = canvas.width * 0.7;
      controlPoint2.y = canvas.height * 0.3;
      controlPoint1Big.x = canvas.width * 0.2;
      controlPoint1Big.y = canvas.height * 0.9;
      controlPoint2Big.x = canvas.width * 0.8;
      controlPoint2Big.y = canvas.height * 0.1;
    };

    window.addEventListener('resize', resizeCanvas);

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="w-full h-[400px] bg-gray-100">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default BezierCurve;