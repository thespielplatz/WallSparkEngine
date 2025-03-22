import Text from '@tsp/wse/GameObjects/Drawing/Text'

export class Time extends Text {
  private showSeconds: boolean

  constructor({ x, y, showSeconds = true, color, centerOnWidth }: { x: number, y: number, showSeconds?: boolean, color?: number, centerOnWidth?: number }) {
    super({ x, y, color, text: '', centerOnWidth })
    this.showSeconds = showSeconds
  }

  override async update(deltaTime: number) {
    await super.update(deltaTime)
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
