import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'

export default class GameObject {
  public x: number
  public y: number
  public visible: boolean

  constructor({ x = 0, y = 0, visible = true }: { x?: number, y?: number, visible?: boolean } = {}) {
    this.x = x
    this.y = y
    this.visible = visible
  }

  // eslint-disable-next-line no-unused-vars
  public async update(deltaTime: number) {
  }

  // eslint-disable-next-line no-unused-vars
  public async draw(pixelBuffer: PixelBuffer) {
  }
}
