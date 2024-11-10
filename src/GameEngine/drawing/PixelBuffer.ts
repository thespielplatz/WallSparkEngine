import GameObject from '@tsp/wse/GameObjects/GameObject'

export default class PixelBuffer {
  private width: number
  private height: number
  private pixelData: number[]
  private translation: { x: number, y: number }

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.pixelData = new Array(width * height).fill(0)
    this.translation = { x: 0, y: 0 }
  }

  public setPixel({ x = 0, y = 0, color = 0 }: { x?: number, y?: number, color: number }) {
    const internalX = x + this.translation.x
    const internalY = y + this.translation.y
    if (internalX < 0 || internalX >= this.width) {
      return
    }
    if (internalY < 0 || internalY >= this.height) {
      return
    }
    const index = internalY * this.width + internalX
    this.setIndex(index, color)
  }

  public setPixelRow({ x = 0, y = 0, colors }: { x?: number, y?: number, colors: number[] }) {
    for (let i = 0; i < colors.length; i++) {
      this.setPixel({
        x: x + i,
        y,
        color: colors[i],
      })
    }
  }

  public setIndex(index: number, color: number) {
    if (index < 0 || index >= this.pixelData.length) {
      return
    }
    this.pixelData[index] = color
  }

  public clear() {
    this.pixelData.fill(0)
  }

  public fill(color: number) {
    this.pixelData.fill(color)
  }

  public getPixelData() {
    return this.pixelData
  }

  public transform(gameObject: GameObject) {
    this.translation = { x: gameObject.x, y: gameObject.y }
  }

  public resetTranform() {
    this.translation = { x: 0, y: 0 }
  }
}
