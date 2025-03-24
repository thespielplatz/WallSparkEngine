import GameObject from '@tsp/wse/GameObjects/GameObject'
import { WHITE } from '@tsp/wse/GameEngine/drawing/colors'
import type PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'

export default class Rectangle extends GameObject {
  private width: number
  private height: number
  public color: number

  constructor({ x, y, width, height, color = WHITE, visible }: { x: number, y: number, width: number, height: number, color?: number, visible?: boolean}) {
    super({ x, y, visible })
    this.width = width
    this.height = height
    this.color = color
  }

  override async draw(pixelBuffer: PixelBuffer) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        pixelBuffer.setPixel({
          x,
          y,
          color: this.color,
        })
      }
    }
  }
}
