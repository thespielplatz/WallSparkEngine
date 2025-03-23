import GameObject from '@tsp/wse/GameObjects/GameObject'
import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import { WHITE } from '@tsp/wse/GameEngine/drawing/colors'

export default class Fill extends GameObject {
  public color: number

  constructor({ color = WHITE, visible }: { color?: number, visible?: boolean }) {
    super({ x: 0, y: 0, visible })
    this.color = color
  }

  override async draw(pixelBuffer: PixelBuffer) {
    pixelBuffer.fill(this.color)
  }
}
