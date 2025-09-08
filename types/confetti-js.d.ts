declare module "confetti-js" {
    export interface ConfettiSettings {
      target: string | HTMLCanvasElement;
      max?: number;
      size?: number;
      animate?: boolean;
      props?: (
        | "circle"
        | "square"
        | "triangle"
        | "line"
        | { type: "image"; src: string; weight?: number }
      )[];
      clock?: number;
      width?: number;
      height?: number;
      rotate?: boolean;
    }
  
    export default class ConfettiGenerator {
      constructor(settings: ConfettiSettings);
      render(): void;
      clear(): void;
    }
  }
  