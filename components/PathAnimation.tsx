'use client';

import React, { useRef, useEffect } from 'react';

const BezierCurve: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match its container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

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

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // Time in seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the path
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);

      let currentPoint: { x: number; y: number };
      let t: number;

      if (elapsed <= 10) {
        // Linear phase (0-10s)
        t = elapsed / 10;
        currentPoint = {
          x: startPoint.x + t * (endPoint.x - startPoint.x),
          y: startPoint.y + t * (endPoint.y - startPoint.y),
        };
        ctx.lineTo(currentPoint.x, currentPoint.y);
      } else if (elapsed <= 30) {
        // First Bezier curve (10-30s)
        t = (elapsed - 10) / 20;
        currentPoint = drawBezierCurve(t, startPoint, endPoint, controlPoint1, controlPoint2);
        for (let i = 0; i <= t; i += 0.01) {
          const point = drawBezierCurve(i, startPoint, endPoint, controlPoint1, controlPoint2);
          ctx.lineTo(point.x, point.y);
        }
      } else if (elapsed <= 50) {
        // Bigger Bezier curve (30-50s)
        t = (elapsed - 30) / 20;
        currentPoint = drawBezierCurve(t, startPoint, endPoint, controlPoint1Big, controlPoint2Big);
        for (let i = 0; i <= t; i += 0.01) {
          const point = drawBezierCurve(i, startPoint, endPoint, controlPoint1Big, controlPoint2Big);
          ctx.lineTo(point.x, point.y);
        }
      } else {
        // Reset animation
        startTime = timestamp;
        ctx.lineTo(startPoint.x, startPoint.y);
        currentPoint = startPoint;
      }

      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw moving point
      drawPoint(currentPoint.x, currentPoint.y, 'red');

      // Draw control points for visualization (optional)
      drawPoint(controlPoint1.x, controlPoint1.y, 'green');
      drawPoint(controlPoint2.x, controlPoint2.y, 'green');
      drawPoint(controlPoint1Big.x, controlPoint1Big.y, 'purple');
      drawPoint(controlPoint2Big.x, controlPoint2Big.y, 'purple');

      requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
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