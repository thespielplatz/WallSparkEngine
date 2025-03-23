import { GameObject } from '@tsp/wse/GameObjects/GameObject'
import { PixelBuffer } from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import { WHITE } from '@tsp/wse/GameEngine/drawing/colors'
import charsetUtils from '@tsp/wse/GameEngine/drawing/charsetUtils'

export default class Text extends GameObject {
  private innerText: string
  private centerOnWidth: number | undefined
  public color: number
  public charSpacing: number

  constructor({ x, y, text, color = WHITE, charSpacing = 1, centerOnWidth, visible }: { x: number, y: number, text: string, color?: number, charSpacing?: number, centerOnWidth?: number, visible?: boolean}) {
    super({ x, y, visible })
    this.innerText = text
    this.color = color
    this.charSpacing = charSpacing
    this.centerOnWidth = centerOnWidth
  }

  // eslint-disable-next-line no-unused-vars
  override async update(deltaTime: number) {
    if (this.centerOnWidth) {
      this.centerTextOnWidth(this.centerOnWidth)
    }
  }

  override async draw(pixelBuffer: PixelBuffer) {
    if (this.innerText.length <= 0) { return }
    this.drawText(pixelBuffer)
  }

  set text(value: unknown) {
    if (value === undefined || value === null) {
      this.innerText = ''
      return
    }

    if (typeof value === 'string') {
      this.innerText = value as string
      return
    }

    if (typeof value === 'number') {
      this.innerText = (value as number).toString()
      return
    }

    if (typeof value === 'object' && 'toString' in value) {
      this.innerText = value.toString()
    }
  }

  get text(): string {
    return this.innerText
  }

  private centerTextOnWidth(width: number) {
    const textAsArray = this.getTextAsArray()
    const charWidths = textAsArray.reduce((acc, char) => {
      const charDefinition = charsetUtils.get(char)
      if (!charDefinition) {
        return acc
      }
      if (!charDefinition[0]) {
        return acc
      }

      return acc + charDefinition[0].length
    }, 0)
    this.x = Math.floor((width - (charWidths  + (textAsArray.length - 1) * this.charSpacing)) / 2)
  }

  private drawText(pixelBuffer: PixelBuffer) {
    const textAsArray = this.getTextAsArray()

    let currentX = 0
    for (let i = 0; i < textAsArray.length; i++) {
      const char: string = textAsArray[i] || ''
      const offset = this.drawCharacter(pixelBuffer, currentX, 0, char)
      currentX += offset + this.charSpacing
    }
  }

  private getTextAsArray(): string[] {
    let formatted = this.innerText.toString().toLowerCase()
    return formatted.match(/.{1}/ug) || []
  }

  private drawCharacter(pixelBuffer: PixelBuffer, offX: number, offY :number, char: string): number {
    const charDefinition = charsetUtils.get(char.toLowerCase())
    if (!charDefinition) {
      console.warn(`Char: ${char} not in charset`)
      return 0
    }

    for (let row = 0; row < charDefinition.length; ++row) {
      const length = charDefinition[row]?.length || 0
      for (let col = 0; col < length; ++col) {
        const rowData = charDefinition[row]
        if (!rowData) {
          continue
        }

        if (rowData[col] == 1) {
          pixelBuffer.setPixel({
            x: offX + col,
            y: offY + row,
            color: this.color,
          })
        }
      }
    }

    return charDefinition[0]?.length || 0
  }
}
