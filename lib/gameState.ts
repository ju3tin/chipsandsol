// lib/gameState.ts

type GameStatus = "waiting" | "running" | "crashed";

let multiplier = 1.0;
let status: GameStatus = "waiting";
let interval: NodeJS.Timeout | null = null;
let crashPoint = 0;

export function startGame() {
  if (status === "running") return;

  multiplier = 1.0;
  status = "running";
  crashPoint = Math.random() * 10 + 1;

  interval = setInterval(() => {
    multiplier += 0.05;
    multiplier = parseFloat(multiplier.toFixed(2));

    if (multiplier >= crashPoint) {
      stopGame(); // Auto stop
      status = "crashed";
    }
  }, 100);
}

export function stopGame() {
  if (interval) clearInterval(interval);
  interval = null;
  status = "waiting";
}

export function getGameState() {
  return { multiplier, status };
}
