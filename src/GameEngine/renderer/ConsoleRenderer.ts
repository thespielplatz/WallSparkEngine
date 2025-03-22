import Jetty from 'jetty'

import AbstractRenderer from '@tsp/wse/GameEngine/renderer/AbstractRenderer'

export default class ConsoleRenderer extends AbstractRenderer {
  private jetty: Jetty

  constructor(params: { width: number, height: number, brightness: number }) {
    super(params)

    this.jetty = new Jetty(process.stdout)
    this.jetty.reset().clear().moveTo([0,0])
  }

  override async render(pixelData: number[]) {
    for (let i = 0; i < pixelData.length; i++) {
      let charWidth = 0
      let x = 0
      let y = 0

      charWidth = 3
      x = i % this.width
      y = Math.floor(i / this.width)

      const c = pixelData[i]
      if (!c) {
        continue
      }

      const r = Math.floor(((0xFF0000 & c) >> 16) / 255 * 5) * this.brightness / 255
      const g = Math.floor(((0xFF00 & c) >> 8) / 255 * 5) * this.brightness / 255
      const b = Math.floor(((0xFF & c)) / 255 * 5) * this.brightness / 255

      this.jetty.moveTo([y, x * charWidth]).rgb([r,g,b]).text(`##${charWidth === 3 ? ' ': ''}`)
    }

    this.jetty.moveTo([pixelData.length / this.width, 0]).rgb([5,5,5])
  }
}
