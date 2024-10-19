import PixelBuffer from './PixelBuffer'

export default class GameObject {
  public x: number
  public y: number

  constructor({ x, y }: { x: number, y: number }) {
    this.x = x
    this.y = y
  }

  public async update() {
  }

  public async draw(pixelBuffer: PixelBuffer) {
  }
}