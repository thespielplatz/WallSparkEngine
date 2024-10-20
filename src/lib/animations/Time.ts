import GameObject from '../GameEngine/modules/GameObject'
import PixelBuffer from '../GameEngine/modules/PixelBuffer'

export default class MovingPixel extends GameObject {
  private width
  private height

  constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
    super({ x, y })
    this.width = width
    this.height = height
  }

  async update() {
  }

  async draw(pixelBuffer: PixelBuffer) {
  }
}