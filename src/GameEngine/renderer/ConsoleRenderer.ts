import ansiEscapes from 'ansi-escapes'

import AbstractRenderer from '@tsp/wse/GameEngine/renderer/AbstractRenderer'

const CHAR_WIDTH = 3
const RESET_COLOR = '\x1b[0m'
export default class ConsoleRenderer extends AbstractRenderer {
  constructor(params: { width: number, height: number, brightness: number }) {
    super(params)

    process.stdout.write(ansiEscapes.eraseScreen)
  }

  override async render(pixelData: number[]) {
    for (let i = 0; i < pixelData.length; i++) {
      let x = 0
      let y = 0

      x = i % this.width
      y = Math.floor(i / this.width)

      const c = pixelData[i]
      if (!c) {
        continue
      }

      const r = (0xFF0000 & c) >> 16 * this.brightness / 255
      const g = (0xFF00 & c) >> 8 * this.brightness / 255
      const b = 0xFF & c * this.brightness / 255
      const colorCode = `\x1b[38;2;${r};${g};${b}m`

      process.stdout.write(ansiEscapes.cursorTo(x * CHAR_WIDTH, y) + colorCode + '## ' + RESET_COLOR)
      if (x === this.width - 1) {
        process.stdout.write(ansiEscapes.eraseEndLine)
      }
    }

    process.stdout.write(ansiEscapes.cursorNextLine)
  }
}
