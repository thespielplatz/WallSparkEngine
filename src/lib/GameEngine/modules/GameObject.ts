import PixelBuffer from './PixelBuffer'

export class GameObject {
  public x: number
  public y: number

  constructor(params: { x: number, y: number }) {
    this.x = params.x
    this.y = params.y
  }

  public async update() {
  }

  public async draw(pixelBuffer: PixelBuffer) {
  }
}