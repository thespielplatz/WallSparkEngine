import Text from '@tsp/wse/GameObjects/Drawing/Text'
import secondsToTimeParts from '@tsp/wse/lib/secondsToTimeParts'

export default class Countdown extends Text {
  private showSeconds: boolean
  private secondsLeft: number
  private nextTick = 0
  private reduceByTime = 0

  constructor({ startTime, x, y, showSeconds = true, color, centerOnWidth, visible }: { startTime: number, x: number, y: number, showSeconds?: boolean, color?: number, centerOnWidth?: number, visible?: boolean }) {
    super({ x, y, color, text: '', centerOnWidth, visible })
    this.showSeconds = showSeconds
    this.secondsLeft = startTime
  }

  override async update(deltaTime: number) {
    await super.update(deltaTime)

    if (this.secondsLeft < 0) {
      return
    }

    this.nextTick -= deltaTime
    if (this.nextTick > 0) {
      return
    }
    if (this.reduceByTime <= 0) {
      this.nextTick += 1
    } else {
      this.nextTick += 0.1
      this.reduceByTime -= 1
    }

    this.drawTime()

    this.secondsLeft--
  }

  setTime(time: number) {
    this.secondsLeft = time
    this.drawTime()
  }

  reduceBy(reduceByTime: number) {
    this.reduceByTime = reduceByTime
    this.nextTick = 0
  }

  private drawTime() {
    const parts = secondsToTimeParts(this.secondsLeft)

    const hours = parts.hours.toString().padStart(2, '0')
    const minutes = parts.minutes.toString().padStart(2, '0')
    const seconds = parts.seconds.toString().padStart(2, '0')

    if (this.showSeconds) {
      this.text = `${hours}:${minutes}:${seconds}`
    } else {
      this.text = `${hours}:${minutes}`
    }
  }
}
