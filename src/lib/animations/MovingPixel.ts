import { GameObject } from '../GameEngine/modules/GameObject'
import PixelBuffer from '../GameEngine/modules/PixelBuffer'

export default class MovingPixel extends GameObject {
  private step = 0
  private width
  private height
  private numberOfPixels

  constructor(params: { x: number, y: number, width: number, height: number }) {
    super({ x: params.x, y: params.y })
    this.width = params.width
    this.height = params.height
    this.numberOfPixels = this.width * this.height
  }

  async update() {
    this.step++
  }

  async draw(pixelBuffer: PixelBuffer) {
    pixelBuffer.setIndex(this.currentIndex, 0xFFFFFF)
    pixelBuffer.setIndex(this.currentIndex - 1, 0xD0D0D0)
    pixelBuffer.setIndex(this.currentIndex - 2, 0xA0A0A0)
    pixelBuffer.setIndex(this.currentIndex - 3, 0x808080)
    pixelBuffer.setIndex(this.currentIndex - 4, 0x505050)
    pixelBuffer.setIndex(this.currentIndex - 5, 0x202020)
    pixelBuffer.setIndex(this.currentIndex - 6, 0x0A0A0A)
  }

  get currentIndex() {
    if (this.step < 0) {
      this.step = this.numberOfPixels + this.step
    }
    this.step %= this.numberOfPixels
    return this.step
  }
}