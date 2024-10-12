import Animation from './Animation'

export default class MovingPixel extends Animation {
  private currentIndex = 0

  constructor(width: number, height: number) {
    super(width, height)
  }

  nextFrame() {
    this.pixels.fill(0)
    this.pixels[this.getIndex(this.currentIndex)] = 0xFFFFFF
    this.pixels[this.getIndex(this.currentIndex - 1)] = 0xD0D0D0
    this.pixels[this.getIndex(this.currentIndex - 2)] = 0xA0A0A0
    this.pixels[this.getIndex(this.currentIndex - 3)] = 0x808080
    this.pixels[this.getIndex(this.currentIndex - 4)] = 0x505050
    this.pixels[this.getIndex(this.currentIndex - 5)] = 0x202020
    this.pixels[this.getIndex(this.currentIndex - 6)] = 0x0A0A0A
    this.currentIndex++
    if (this.currentIndex >= this.pixels.length) {
      this.currentIndex = 0
    }    
  }

  getIndex(index: number) {
    if (index < 0) {
      index = this.pixels.length + index
    }
    return index % this.pixels.length
  }
}