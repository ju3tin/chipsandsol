"use client";

import { useEffect, useRef, useState } from "react";
import { color } from "framer-motion";
import Image from "next/image";

const startx = 0;
const starty = 170;

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
  tValues: {
    number: number;
    color: string;
    svg: string;
  }[];
}

const GameVisual: React.FC<GameVisualProps> = ({
  Gametimeremaining,
  GameStatus,
  currentMultiplier,
  dude55,
  dude56,
  betAmount,
  tValues,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fishRef = useRef<HTMLDivElement | null>(null);
  const curveAnimationRef = useRef<number>(0);
  const pointBRef = useRef<{ x: number; y: number }>({ x: startx, y: starty });
  const [previousTimeRemaining, setPreviousTimeRemaining] = useState<number | null>(null);
  const tValuesRef = useRef(tValues);
  const dude55Ref = useRef(dude55);
  const [controlPoints, setControlPoints] = useState<ControlPoint[]>([]);

  useEffect(() => {
    tValuesRef.current = tValues;
    dude55Ref.current = dude55;
  }, [tValues, dude55]);

  useEffect(() => {
    if (isNaN(Gametimeremaining)) {
      return;
    } else {
      setPreviousTimeRemaining(Gametimeremaining);
    }
  }, [Gametimeremaining]);

  useEffect(() => {
    async function fetchControlPoints() {
      try {
        const response = await fetch("/api/bezier");
        const data = await response.json();
        if (!data || !data.frames) return;
        const mappedPoints = data.frames.map((frame: any) => ({
          cp1: frame.cp1 || { x: 300, y: 50 },
          cp2: frame.cp2 || { x: 300, y: 50 },
          pointB: frame.pointB || { x: 300, y: 50 },
        }));
        setControlPoints(mappedPoints);
      } catch (error) {
        console.error("Error fetching control points:", error);
      }
    }
    fetchControlPoints();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const fish = fishRef.current;
    if (!canvas || !fish) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (controlPoints.length === 0) return;

    // Preload dot images to prevent flickering
    const dotImages = tValues.map((dot) => {
      const img = new window.Image();
      img.src = dot.svg;
      return img;
    });

    const fish1 = new window.Image();
    fish1.src = "/images/chippy.svg";

    // Calculate position and tangent based on currentMultiplier
    const getMultiplierPosition = (multiplier: number) => {
      // Map multiplier to t (0-1) and segment
      const maxMultiplierPerSegment = 10; // Adjust based on your game logic
      const segmentIndex = Math.floor(multiplier / maxMultiplierPerSegment);
      const segmentT = (multiplier % maxMultiplierPerSegment) / maxMultiplierPerSegment;

      let cp1 = { x: startx, y: starty };
      let cp2 = { x: startx, y: starty };
      let pointB = { x: startx, y: starty };

      if (segmentIndex < controlPoints.length) {
        cp1 = controlPoints[segmentIndex].cp1;
        cp2 = controlPoints[segmentIndex].cp2;
        pointB = controlPoints[segmentIndex].pointB;
      }

      const prevPointB = segmentIndex > 0 ? controlPoints[segmentIndex - 1].pointB : { x: startx, y: starty };

      const position = getBezierPoint(segmentT, prevPointB, cp1, cp2, pointB);
      const tangent = getBezierTangent(segmentT, prevPointB, cp1, cp2, pointB);

      return { position, tangent, curvePoints: { cp1, cp2, pointB } };
    };

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

    function getBezierTangent(t: number, p0: any, p1: any, p2: any, p3: any) {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;

      const dx = -3 * uu * p0.x + 3 * (uu - 2 * u * t) * p1.x + 3 * (2 * t * u - tt) * p2.x + 3 * tt * p3.x;
      const dy = -3 * uu * p0.y + 3 * (uu - 2 * u * t) * p1.y + 3 * (2 * t * u - tt) * p2.y + 3 * tt * p3.y;
      return Math.atan2(dy, dx);
    }

    let logged = false;

    function animate() {
      if (!canvas || !ctx || !fish1.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current position and tangent based on multiplier
      const { position, tangent, curvePoints } = getMultiplierPosition(currentMultiplier);

      // Draw the curve up to the current point
      if (curvePoints) {
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        const prevPointB = Math.floor(currentMultiplier / 10) > 0 ? controlPoints[Math.floor(currentMultiplier / 10) - 1].pointB : { x: startx, y: starty };
        ctx.bezierCurveTo(curvePoints.cp1.x, curvePoints.cp1.y, curvePoints.cp2.x, curvePoints.cp2.y, position.x, position.y);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw dots
      tValues.forEach((dotT, index) => {
        if (dotT.number * 10 <= currentMultiplier) {
          const dotPos = getBezierPoint(
            dotT.number,
            { x: startx, y: starty },
            curvePoints?.cp1 || { x: startx, y: starty },
            curvePoints?.cp2 || { x: startx, y: starty },
            position
          );

          ctx.beginPath();
          ctx.arc(dotPos.x, dotPos.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = dotT.color;
          ctx.fill();

          if (dotImages[index].complete) {
            ctx.drawImage(dotImages[index], dotPos.x - 8, dotPos.y - 8, 20, 20);
          }
        }
      });

      // Draw fish with smooth rotation
      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(tangent);
      ctx.drawImage(fish1, -25, -25, 50, 50);
      ctx.restore();

      pointBRef.current = position;

      if (dude55 && !logged) {
        console.log("Recording multiplier because dude55 is true:", currentMultiplier.toFixed(4));
        logged = true;
      }

      if (GameStatus === "Running") {
        curveAnimationRef.current = requestAnimationFrame(animate);
      }
    }

    fish1.onload = () => {
      if (GameStatus === "Running") {
        animate();
      }
    };

    if (GameStatus !== "Running" && curveAnimationRef.current) {
      cancelAnimationFrame(curveAnimationRef.current);
    }

    return () => {
      if (curveAnimationRef.current) {
        cancelAnimationFrame(curveAnimationRef.current);
      }
    };
  }, [GameStatus, dude55, controlPoints, currentMultiplier]);

  return (
    <div className="relative h-64 bg-gray-900 rounded-lg overflow-hidden mb-4">
      <Image
        src="/images/123b.png"
        alt="Background image"
        fill
        className="relative rounded-lg overflow-hidden"
      />
      {GameStatus === "Running" && (
        <div className="absolute inset-0">
          <canvas ref={canvasRef} width={400} height={200} className="w-full h-full" />
          <span
            style={{
              top: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "block",
              position: "absolute",
              color: currentMultiplier > 5 ? "red" : currentMultiplier > 2 ? "yellow" : "white",
              fontSize: "2rem",
            }}
          >
            {currentMultiplier}x
          </span>
          {dude55 && (
            <div
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{
                left: pointBRef.current.x,
                top: pointBRef.current.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              {dude56} and your bet amount {betAmount}
            </div>
          )}
          <div style={{ display: "none" }} ref={fishRef} className="absolute w-6 h-6">
            <Image
              src="/images/chippy.svg"
              alt="End Fish"
              width={24}
              height={24}
              className="absolute w-6 h-6"
              style={{
                transform: `translate(${pointBRef.current.x - 12}px, ${pointBRef.current.y - 12}px)`,
                marginTop: "-150px",
              }}
            />
          </div>
        </div>
      )}
      {GameStatus === "Crashed" && (
        <>
          <span
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              display: "block",
              position: "absolute",
            }}
          >
            <Image width={275} height={275} src="/explode1.svg" alt="Explosion effect" />
          </span>
          <span
            style={{
              top: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "block",
              position: "absolute",
              color: currentMultiplier > 5 ? "red" : currentMultiplier > 2 ? "yellow" : "white",
              fontSize: "2rem",
            }}
          >
            {currentMultiplier}x
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
          Launch in
          {typeof Gametimeremaining === "number" && !isNaN(Gametimeremaining) ? (
            <>
              {" "}
              {Gametimeremaining}{" "}
              {Gametimeremaining > 1 ? "secs" : "sec"}
            </>
          ) : (
            <>
              {" "}
              {previousTimeRemaining}{" "}
              {previousTimeRemaining != null && previousTimeRemaining > 1 ? "secs" : "sec"}
            </>
          )}
        </span>
      )}
    </div>
  );
};

export default GameVisual;