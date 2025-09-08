declare module 'js-confetti' {
    export interface IAddConfettiConfig {
      emojis?: string[]
      confettiColors?: string[]
      confettiRadius?: number
      confettiNumber?: number
      images?: HTMLImageElement[] // ✅ allow custom images
    }
  
    export default class JSConfetti {
      /**
       * You can either let JSConfetti create its own <canvas>,
       * or pass in your own <canvas> element.
       */
      constructor(props?: { canvas?: HTMLCanvasElement })
  
      /**
       * Throw confetti on the canvas
       */
      addConfetti(config?: IAddConfettiConfig): Promise<void>
  
      /**
       * Clear the canvas
       */
      clearCanvas(): void
    }
  }
  