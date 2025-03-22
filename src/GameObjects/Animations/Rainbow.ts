import { GameObject } from '@tsp/wse/GameObjects/GameObject'
import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'

export class Rainbow extends GameObject {
  private width
  private height
  private numberOfPixels

  private offset: number
  private floatOffset: number
  private speed: number
  private brightnessFactor: number

  constructor({ x, y, width, height, speed = 1.0 }: { x: number, y: number, width: number, height: number, speed?: number }) {
    super({ x, y })
    this.width = width
    this.height = height
    this.numberOfPixels = this.width * this.height
    this.brightnessFactor = 1.0
    this.speed = speed
    this.offset = 0
    this.floatOffset = 0
  }

  override async update() {
    this.floatOffset += this.speed
    this.offset = Math.floor(this.floatOffset) % 256
  }

  override async draw(pixelBuffer: PixelBuffer) {
    for (let i = 0; i < this.numberOfPixels; i++) {
      pixelBuffer.setIndex(i, this.colorwheel((this.offset + i) % 256))
    }
  }

  private rgb2Int(r: number, g: number, b: number): number {
    r = Math.floor(r * this.brightnessFactor)
    g = Math.floor(g * this.brightnessFactor)
    b = Math.floor(b * this.brightnessFactor)
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff)
  }

  private colorwheel(pos: number): number {
    pos = 255 - pos
    if (pos < 85) {
      return this.rgb2Int(255 - pos * 3, 0, pos * 3)
    } else if (pos < 170) {
      pos -= 85
      return this.rgb2Int(0, pos * 3, 255 - pos * 3)
    } else {
      pos -= 170
      return this.rgb2Int(pos * 3, 255 - pos * 3, 0)
    }
  }
}
