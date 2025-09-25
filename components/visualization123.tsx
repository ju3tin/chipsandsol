"use client";

import { useEffect, useRef, useState } from "react";
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
  tValues: { number: number; color: string; svg: string }[];
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
  const curveAnimationRef = useRef<number>(0);
  const pointBRef = useRef<{ x: number; y: number }>({ x: startx, y: starty });
  const currentAngleRef = useRef<number>(0); // Persistent rotation angle
  const segmentStartAngleRef = useRef<number>(0); // Angle at the start of the segment
  const segmentTargetAngleRef = useRef<number>(0); // Target angle for the segment
  const [previousTimeRemaining, setPreviousTimeRemaining] = useState<number | null>(null);
  const tValuesRef = useRef(tValues);
  const dude55Ref = useRef(dude55);
  const [controlPoints, setControlPoints] = useState<ControlPoint[]>([]);

  useEffect(() => {
    tValuesRef.current = tValues;
    dude55Ref.current = dude55;
  }, [tValues, dude55]);

  useEffect(() => {
    if (!isNaN(Gametimeremaining)) {
      setPreviousTimeRemaining(Gametimeremaining);
    }
  }, [Gametimeremaining]);

  useEffect(() => {
    async function fetchControlPoints() {
      try {
        const response = await fetch('/api/bezier');
        const data = await response.json();
        if (!data || !data.frames) return;
        const mappedPoints = data.frames.map((frame: any) => ({
          cp1: frame.cp1 || { x: 300, y: 50 },
          cp2: frame.cp2 || { x: 300, y: 50 },
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
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (controlPoints.length === 0) return;

    let t = 0;
    let transitionIndex = 0;
    let currentCP1 = { x: startx, y: starty };
    let currentCP2 = { x: startx, y: starty };
    let currentPointB = { x: startx, y: starty };
    let targetCP1 = controlPoints[0].cp1;
    let targetCP2 = controlPoints[0].cp2;
    let targetPointB = controlPoints[0].pointB;
if (GameStatus === "Running") {
    // Initialize angles for the first segment
    segmentStartAngleRef.current = getBezierTangent(0, { x: startx, y: starty }, targetCP1, targetCP2, targetPointB);
    segmentTargetAngleRef.current = getBezierTangent(1, { x: startx, y: starty }, targetCP1, targetCP2, targetPointB);
    currentAngleRef.current = segmentStartAngleRef.current;
}else{
  segmentStartAngleRef.current = 0;
  segmentTargetAngleRef.current = 0;
  currentAngleRef.current = 0;
}
    if (GameStatus === "Crashed") {
      currentAngleRef.current = 0;
      segmentStartAngleRef.current = 0;
      segmentTargetAngleRef.current = 0;
    }
if (GameStatus === "Waiting") {
  currentAngleRef.current = 0;
  segmentStartAngleRef.current = 0;
  segmentTargetAngleRef.current = 0;
}


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

    const fish1 = new window.Image();
    fish1.src = "/images/chippy.svg";
    fish1.onload = () => {
      requestAnimationFrame(animate);
    };

    let logged = false;

    function animate() {
      if (!canvas || !ctx || !fish1.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(startx, starty);

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

      // Draw dots
      tValues.forEach((dotT) => {
        const { x, y } = getBezierPoint(
          dotT.number,
          { x: startx, y: starty },
          { x: cp1x, y: cp1y },
          { x: cp2x, y: cp2y },
          { x: pointBx, y: pointBy }
        );
        const img = new window.Image();
        img.src = dotT.svg;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dotT.color;
        ctx.fill();
        img.onload = () => {
          ctx.drawImage(img, x - 8, y - 8, 20, 20);
        };
      });

      // Calculate the target angle from the Bezier tangent
      const targetAngle = getBezierTangent(t, 
        { x: startx, y: starty },
        { x: cp1x, y: cp1y },
        { x: cp2x, y: cp2y },
        { x: pointBx, y: pointBy }
      );
     
if (GameStatus === "Running") {
      // Interpolate between segmentStartAngle and segmentTargetAngle based on t
      let startAngle = segmentStartAngleRef.current;
      let endAngle = segmentTargetAngleRef.current;
      let delta = endAngle - startAngle;
      delta = ((delta + Math.PI) % (2 * Math.PI)) - Math.PI;
      let interpAngle = startAngle + delta * t;
      currentAngleRef.current = ((interpAngle + Math.PI) % (2 * Math.PI)) - Math.PI;

      }
      // Shortest path interpolation
   
      if (GameStatus !== "Running") {
        currentAngleRef.current = 0;
        segmentStartAngleRef.current = 0;
        segmentTargetAngleRef.current = 0;
        let startAngle = 0;
        let endAngle = 0;
        let delta = 0;
        let interpAngle = startAngle + delta * t;
        currentAngleRef.current = ((interpAngle + Math.PI) % (2 * Math.PI)) - Math.PI;
  
      }
      if (GameStatus === "Crashed") {
        currentAngleRef.current = 0;
        segmentStartAngleRef.current = 0;
        segmentTargetAngleRef.current = 0;
        let startAngle = 0;
        let endAngle = 0;
        let delta = 0;
        let interpAngle = startAngle + delta * t;
        currentAngleRef.current = ((interpAngle + Math.PI) % (2 * Math.PI)) - Math.PI;
  
      }

      // Debugging: Log angle and segment info
      console.log(
        `Segment: ${transitionIndex}, t: ${t.toFixed(3)}, ` +
        `Angle: ${(currentAngleRef.current * 180 / Math.PI).toFixed(2)} deg, ` +
        `Position: (${pointBx.toFixed(1)}, ${pointBy.toFixed(1)})`
      );

      // Draw fish with the smoothed angle
      ctx.save();
      ctx.translate(pointBx, pointBy);
      ctx.rotate(currentAngleRef.current);
      ctx.drawImage(fish1, -25, -25, 50, 50);
      ctx.restore();

      pointBRef.current = { x: pointBx, y: pointBy };

      t += 0.01;

      if (t > 1) {
        if (controlPoints.length === 0) return;
        transitionIndex = (transitionIndex + 1) % controlPoints.length;
        console.log(
          `Transition to segment ${transitionIndex}: ` +
          `CP1(${controlPoints[transitionIndex].cp1.x}, ${controlPoints[transitionIndex].cp1.y}), ` +
          `CP2(${controlPoints[transitionIndex].cp2.x}, ${controlPoints[transitionIndex].cp2.y}), ` +
          `PointB(${controlPoints[transitionIndex].pointB.x}, ${controlPoints[transitionIndex].pointB.y})`
        );
        t = 0;
        currentCP1 = targetCP1;
        currentCP2 = targetCP2;
        currentPointB = targetPointB;
        targetCP1 = controlPoints[transitionIndex].cp1;
        targetCP2 = controlPoints[transitionIndex].cp2;
        targetPointB = controlPoints[transitionIndex].pointB;
        // Set up angles for the new segment
        if (GameStatus === "Running") {
        segmentStartAngleRef.current = currentAngleRef.current;
        segmentTargetAngleRef.current = getBezierTangent(1, 
          { x: startx, y: starty },
          targetCP1,
          targetCP2,
          targetPointB
        )}else{
          segmentStartAngleRef.current = 0;
          segmentTargetAngleRef.current = 0;
          currentAngleRef.current = 0;
        }
        console.log(
          `New segment initial tangent: ${(segmentStartAngleRef.current * 180 / Math.PI).toFixed(2)} deg, target: ${(segmentTargetAngleRef.current * 180 / Math.PI).toFixed(2)} deg`
        );
      }

      curveAnimationRef.current = requestAnimationFrame(animate);
    }

    if (dude55 && !logged) {
      console.log("Recording t because dude55 is true:", t.toFixed(4));
      logged = true;
    }

    if (GameStatus === "Running") {
      animate();
    } else if (curveAnimationRef.current) {
      cancelAnimationFrame(curveAnimationRef.current);
    }
if (GameStatus === "Waiting") {
  currentAngleRef.current = 0;
  segmentStartAngleRef.current = 0;
  segmentTargetAngleRef.current = 0;
  
}
if (GameStatus === "Crashed") {
  currentAngleRef.current = 0;
  segmentStartAngleRef.current = 0;
  segmentTargetAngleRef.current = 0;
}
    return () => {
      if (curveAnimationRef.current) {
        cancelAnimationFrame(curveAnimationRef.current);
      }
    };
  }, [GameStatus, dude55, controlPoints]);

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
            {currentMultiplier}x
          </span>
          {dude55 && (
            <div
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{
                left: pointBRef.current.x - currentMultiplier * 10,
                top: pointBRef.current.y + currentMultiplier * 5,
                transform: "translate(-50%, -50%)",
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
              left: "50%",
              transform: "translateX(-50%)",
              display: "block",
              position: "absolute",
            }}
          >
            <Image
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
          Launch in{" "}
          {typeof Gametimeremaining === "number" && !isNaN(Gametimeremaining) ? (
            <>
              {Gametimeremaining}{" "}
              {Gametimeremaining > 1 ? "secs" : "sec"}
            </>
          ) : (
            <>
              {previousTimeRemaining}{" "}
              {previousTimeRemaining != null && previousTimeRemaining > 1
                ? "secs"
                : "sec"}
            </>
          )}
        </span>
      )}
    </div>
  );
};

export default GameVisual;