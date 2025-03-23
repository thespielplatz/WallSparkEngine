import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import GameObject from '../GameObject'

export default class Blinker extends GameObject {
  private colors: number[]
  private wait: number
  private colorIndex = 0
  private nextTick = 0

  constructor({ colors, wait = 1, visible }: { colors: number[], wait?: number, visible?: boolean }) {
    super({ visible })
    this.colors = colors
    this.wait = wait
    this.nextTick = wait
  }

  override async update(deltaTime: number) {
    await super.update(deltaTime)

    this.nextTick -= deltaTime
    if (this.nextTick > 0) {
      return
    }
    this.nextTick += this.wait
    this.colorIndex = (this.colorIndex + 1) % this.colors.length
  }

  override async draw(pixelBuffer: PixelBuffer) {
    const color = this.colors[this.colorIndex]
    if (color) {
      pixelBuffer.fill(color)
    }
  }
}
