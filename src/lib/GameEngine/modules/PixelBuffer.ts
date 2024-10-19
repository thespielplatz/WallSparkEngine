export default class PixelBuffer {
  private width: number
  private height: number
  private pixelData: number[]

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.pixelData = new Array(width * height).fill(0)
  }

  public setPixel(x: number, y: number, color: number) {
    this.pixelData[y * this.width + x] = color
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
}