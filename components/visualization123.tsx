"use client";

import React, { useEffect, useRef, useState } from "react";

interface ControlPoint {
  cp1: { x: number; y: number };
  cp2: { x: number; y: number };
  pointB: { x: number; y: number };
}

interface GameVisualProps {
  currentMultiplier: number;
  onCashout: (multiplier: number) => void;
  dude55: boolean;
  dude56: string;
  betAmount: string;
  Gametimeremaining: number;
  GameStatus: string;
  tValues: { number: number; color: string; svg: string }[];
}

const GameVisual: React.FC<GameVisualProps> = ({
  currentMultiplier,
  GameStatus,
  Gametimeremaining,
  dude55,
  dude56,
  betAmount,
  tValues,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const curveAnimationRef = useRef<number>(0);
  const [controlPoints, setControlPoints] = useState<ControlPoint[]>([]);
  const pointBRef = useRef<{ x: number; y: number }>({ x: 10, y: 190 });

  useEffect(() => {
    async function fetchControlPoints() {
      try {
        const response = await fetch('/api/bezier');
        const data = await response.json();
        if (!data || !data.frames) return;
        const mappedPoints = data.frames.map((frame: any) => ({
          cp1: frame.cp1 || { x: 100, y: 100 },
          cp2: frame.cp2 || { x: 200, y: 100 },
          pointB: frame.pointB || { x: 300, y: 50 },
        }));
        setControlPoints(mappedPoints);
      } catch (error) {
        console.error('Error fetching control points:', error);
      }
    }
    fetchControlPoints();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || controlPoints.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure currentMultiplier is a number
    const safeMultiplier = typeof currentMultiplier === "number" ? currentMultiplier : 0;

    let t: number = 0; // Explicitly type t as number
    let transitionIndex = 0;
    let currentCP1 = { x: 10, y: 190 };
    let currentCP2 = { x: 100, y: 190 };
    let currentPointB = { x: 10, y: 190 };
    let targetCP1 = controlPoints[0].cp1;
    let targetCP2 = controlPoints[0].cp2;
    let targetPointB = controlPoints[0].pointB;

    function getBezierPoint(t: number, p0: any, p1: any, p2: any, p3: any) {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;
      const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
      const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
      return { x, y };
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw graph axes
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(10, canvas.height - 10);
      ctx.moveTo(10, canvas.height - 10);
      ctx.lineTo(canvas.width - 10, canvas.height - 10);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw multiplier labels on the y-axis
      ctx.font = "12px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "right";
      const maxMultiplier = 10;
      const yAxisHeight = canvas.height - 20;
      for (let i = 0; i <= maxMultiplier; i++) {
        const y = canvas.height - 10 - (i / maxMultiplier) * yAxisHeight;
        ctx.fillText(`${i}x`, 25, y + 5);
      }

      // Draw time labels on the x-axis
      ctx.textAlign = "center";
      const maxTime = 20;
      const xAxisWidth = canvas.width - 40;
      for (let i = 0; i <= maxTime; i += 5) {
        const x = 10 + (i / maxTime) * xAxisWidth;
        ctx.fillText(`${i}s`, x, canvas.height - 5);
      }

      // Adjust targetPointB based on safeMultiplier
      const targetX = 10 + (safeMultiplier / maxMultiplier) * xAxisWidth;
      const targetY = canvas.height - 10 - (safeMultiplier / maxMultiplier) * yAxisHeight;
      targetPointB = { x: targetX, y: targetY };

      // Draw Bezier curve
      ctx.beginPath();
      ctx.moveTo(10, 190);
      const cp1x = currentCP1.x + (targetCP1.x - currentCP1.x) * t;
      const cp1y = currentCP1.y + (targetCP1.y - currentCP1.y) * t;
      const cp2x = currentCP2.x + (targetCP2.x - currentCP2.x) * t;
      const cp2y = currentCP2.y + (targetCP2.y - currentCP2.y) * t;
      const pointBx = currentPointB.x + (targetPointB.x - currentPointB.x) * t;
      const pointBy = currentPointB.y + (targetPointB.y - currentPointB.y) * t;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, pointBx, pointBy);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      pointBRef.current = { x: pointBx, y: pointBy };

      // Draw current multiplier label
      if (GameStatus === "Running") {
        ctx.fillStyle = safeMultiplier > 5 ? "red" : safeMultiplier > 2 ? "yellow" : "white";
        ctx.fillText(`${safeMultiplier.toFixed(2)}x`, pointBx + 10, pointBy);
      }

      // Draw crash indicator
      if (GameStatus === "Crashed") {
        ctx.fillStyle = "white";
        ctx.fillText(`${safeMultiplier.toFixed(2)}x`, pointBx + 10, pointBy);
        ctx.beginPath();
        ctx.moveTo(pointBx + 5, pointBy - 10);
        ctx.lineTo(pointBx + 25, pointBy + 10);
        ctx.moveTo(pointBx + 25, pointBy - 10);
        ctx.lineTo(pointBx + 5, pointBy + 10);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw max profit label
      ctx.fillStyle = "white";
      ctx.fillText("Max profit: $5.53", canvas.width - 80, 20);

      t += 0.01;
      if (t > 1) {
        t = 0;
        transitionIndex = (transitionIndex + 1) % controlPoints.length;
        currentCP1 = targetCP1;
        currentCP2 = targetCP2;
        currentPointB = targetPointB;
        targetCP1 = controlPoints[transitionIndex].cp1;
        targetCP2 = controlPoints[transitionIndex].cp2;
        targetPointB = controlPoints[transitionIndex].pointB;
      }

      if (GameStatus === "Running") {
        curveAnimationRef.current = requestAnimationFrame(animate);
      } else if (curveAnimationRef.current) {
        cancelAnimationFrame(curveAnimationRef.current);
      }
    }

    if (GameStatus === "Running") {
      animate();
    } else if (curveAnimationRef.current) {
      cancelAnimationFrame(curveAnimationRef.current);
    }

    return () => {
      if (curveAnimationRef.current) {
        cancelAnimationFrame(curveAnimationRef.current);
      }
    };
  }, [currentMultiplier, GameStatus, controlPoints]);

  return (
    <div className="relative h-64 bg-gray-900 overflow-hidden mb-4">
      {GameStatus === "Running" && (
        <div className="absolute inset-0">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-full"
          />
          <span
            style={{
              top: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "block",
              position: "absolute",
              color:
                currentMultiplier > 5
                  ? "red"
                  : currentMultiplier > 2
                  ? "yellow"
                  : "white",
              fontSize: "2rem",
            }}
          >
            {currentMultiplier.toFixed(2)}x
          </span>
          {dude55 && (
            <div
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{
                left: "50%",
                top: "120px",
                transform: "translateX(-50%)",
              }}
            >
              {dude56} and your bet amount {betAmount}
            </div>
          )}
        </div>
      )}
      {GameStatus === "Crashed" && (
        <>
          <span
            style={{
              top: "68.75px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "block",
              position: "absolute",
            }}
          >
            <img
              width={275}
              height={275}
              src="/explode1.svg"
              alt="Explosion effect"
            />
          </span>
          <span
            style={{
              top: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "block",
              position: "absolute",
              color:
                currentMultiplier > 5
                  ? "red"
                  : currentMultiplier > 2
                  ? "yellow"
                  : "white",
              fontSize: "2rem",
            }}
          >
            {currentMultiplier.toFixed(2)}x
          </span>
        </>
      )}
      {GameStatus === "Waiting" && (
        <span
          style={{
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "block",
            position: "absolute",
            color: "white",
            fontSize: "2rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          Launch in{" "}
          {typeof Gametimeremaining === "number" && !isNaN(Gametimeremaining)
            ? `${Gametimeremaining} ${Gametimeremaining > 1 ? "secs" : "sec"}`
            : "N/A"}
        </span>
      )}
    </div>
  );
};

export default GameVisual;