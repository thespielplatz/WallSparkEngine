import GameObject from '@tsp/wse/GameObjects/GameObject'
import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import { WHITE } from '@tsp/wse/GameEngine/drawing/colors'

export default class Fill extends GameObject {
  public color: number

  constructor({ color = WHITE }: { color?: number }) {
    super({ x: 0, y: 0 })
    this.color = color
  }

  async draw(pixelBuffer: PixelBuffer) {
    pixelBuffer.fill(this.color)
  }
}
