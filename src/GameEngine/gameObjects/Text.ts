import GameObject from './GameObject'
import PixelBuffer from '../drawing/PixelBuffer'
import { WHITE } from '../drawing/colors'
import charsetUtils from '../drawing/charsetUtils'

export default class Text extends GameObject {
  public text: string
  public color: number
  public charSpacing: number

  constructor({ x, y, text, color = WHITE, charSpacing = 1 }: { x: number, y: number, text: string, color?: number, charSpacing?: number }) {
    super({ x, y })
    this.text = text
    this.color = color
    this.charSpacing = charSpacing
  }

  async draw(pixelBuffer: PixelBuffer) {
    if (this.text.length <= 0) return
    this.drawText(pixelBuffer)
  }

  private drawText(pixelBuffer: PixelBuffer) {
    let formatted = this.text.toString().toLowerCase()
    const textAsArray = formatted.match(/.{1}/ug) || []

    let currentX = 0
    for (let i = 0; i < textAsArray.length; i++) {
      const char = textAsArray[i]
      const offset = this.drawCharacter(pixelBuffer, currentX, 0, char)
      currentX += offset + this.charSpacing
    }
  }

  private drawCharacter(pixelBuffer: PixelBuffer, offX: number, offY :number, char: string): number {
    const charDefinition = charsetUtils.get(char.toLowerCase())
    if (!charDefinition) {
      console.warn(`Char: ${char} not in charset`)
      return 0
    }

    for (let row = 0; row < charDefinition.length; ++row) {
      for (let col = 0; col < charDefinition[row].length; ++col) {

        if (charDefinition[row][col] == 1) {
          pixelBuffer.setPixel(offX + col, offY + row, this.color)
        }
      }
    }

    return charDefinition[0].length
  }
}
