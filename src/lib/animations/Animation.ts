export default class Animation {
  protected width: number
  protected height: number
  public pixels: number[]

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.pixels = new Array(width * height).fill(0)
  }

  nextFrame() {
    throw new Error('Not implemented')
  }
}