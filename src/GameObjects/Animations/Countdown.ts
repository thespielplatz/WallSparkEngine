import Text from '@tsp/wse/GameObjects/Drawing/Text'
import secondsToTimeParts from '@tsp/wse/lib/secondsToTimeParts'

export default class Countdown extends Text {
  private showSeconds: boolean
  private secondsLeft: number
  private nextTick = 0

  constructor({ startTime, x, y, showSeconds = true, color, centerOnWidth }: { startTime: number, x: number, y: number, showSeconds?: boolean, color?: number, centerOnWidth?: number }) {
    super({ x, y, color, text: '', centerOnWidth })
    this.showSeconds = showSeconds
    this.secondsLeft = startTime
  }

  async update(deltaTime: number) {
    await super.update(deltaTime)

    if (this.secondsLeft < 0) {
      return
    }

    if (this.nextTick > 0) {
      this.nextTick -= deltaTime
      return
    }
    this.nextTick = 1

    const parts = secondsToTimeParts(this.secondsLeft)

    const hours = parts.hours.toString().padStart(2, '0')
    const minutes = parts.minutes.toString().padStart(2, '0')
    const seconds = parts.seconds.toString().padStart(2, '0')

    if (this.showSeconds) {
      this.text = `${hours}:${minutes}:${seconds}`
    } else {
      this.text = `${hours}:${minutes}`
    }

    this.secondsLeft--
  }

  setTime(time: number) {
    this.secondsLeft = time
  }
}
