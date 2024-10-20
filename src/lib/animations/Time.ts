import Text from '../GameEngine/gameObjects/Text'
import PixelBuffer from '../GameEngine/drawing/PixelBuffer'
import { DEFAULT_CHARSET_WIDTH } from '../GameEngine/drawing/charsetUtils'

export default class Time extends Text {
  private showSeconds: boolean

  constructor({ x, y, showSeconds = true, color }: { x: number, y: number, showSeconds?: boolean, color?: number }) {
    super({ x, y, color, text: '' })
    this.showSeconds = showSeconds
  }

  public centerOnWidth(width: number) {
    if (this.showSeconds) {
      this.x = Math.floor((width - 6 * (DEFAULT_CHARSET_WIDTH + this.charSpacing) - 2 * (1 + this.charSpacing) + 1) / 2)
    } else {
      this.x = Math.floor((width - 4 * (DEFAULT_CHARSET_WIDTH + this.charSpacing) - 1 * (1 + this.charSpacing) + 1) / 2)
    }
  }
  
  async update() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')

    if (this.showSeconds) {
      this.text = `${hours}:${minutes}:${seconds}`
    } else {
      this.text = `${hours}:${minutes}`
    }
  }
}
