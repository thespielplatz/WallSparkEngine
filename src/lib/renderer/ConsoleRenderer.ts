import AbstractRenderer from './AbstractRenderer'
import Jetty from 'jetty'

const VALID_ROTATION = [0, 90, 180, 270]

export default class ConsoleRenderer extends AbstractRenderer {
  private jetty: Jetty

  constructor(params: { width: number, height: number, brightness: number }) {
    super(params)
    console.info('ConsoleRenderer init')

    this.jetty = new Jetty(process.stdout)
    this.jetty.reset().clear().moveTo([0,0])
  }

  init() {
    // Do Nothing
  }

  deinit() {
    // Do Nothing
  }

  render(pixelData: number[]) {
    for (let i = 0; i < pixelData.length; i++) {
      let charWidth = 0
      let x = 0
      let y = 0

      charWidth = 3
      x = i % this.width
      y = Math.floor(i / this.width)

      const r = Math.floor(((0xFF0000 & pixelData[i]) >> 16) / 255 * 5)
      const g = Math.floor(((0xFF00 & pixelData[i]) >> 8) / 255 * 5)
      const b = Math.floor(((0xFF & pixelData[i])) / 255 * 5)

      this.jetty.moveTo([y, x * charWidth]).rgb([r,g,b]).text(`##${charWidth === 3 ? ' ': ''}`)
    }

    this.jetty.moveTo([pixelData.length / this.width, 0]).rgb([5,5,5])
  }
}
