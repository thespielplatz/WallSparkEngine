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

  async update(deltaTime: number) {
    await super.update(deltaTime)

    if (this.nextTick > 0) {
      this.nextTick -= deltaTime
      return
    }
    this.nextTick = this.wait
    this.colorIndex = (this.colorIndex + 1) % this.colors.length
  }

  async draw(pixelBuffer: PixelBuffer) {
    pixelBuffer.fill(this.colors[this.colorIndex])
  }
}
