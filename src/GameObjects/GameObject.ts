import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'

export default class GameObject {
  public x: number
  public y: number

  constructor({ x = 0, y = 0 }: { x?: number, y?: number } = {}) {
    this.x = x
    this.y = y
  }

  // eslint-disable-next-line no-unused-vars
  public async update(deltaTime: number) {
  }

  // eslint-disable-next-line no-unused-vars
  public async draw(pixelBuffer: PixelBuffer) {
  }
}
