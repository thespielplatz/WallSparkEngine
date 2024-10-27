import Text from '@/GameEngine/gameObjects/Text'
import axios from 'axios'

export default class BlockTime extends Text {
  private timeIntervalInSeconds: number = 0
  private centerOnWidth: number
  private nextUpdateTime: number

  constructor({ x = 0, y = 0, timeIntervalInSeconds = 5, centerOnWidth = 0 }: { x?: number, y?: number, timeIntervalInSeconds?: number, centerOnWidth? : number } = {}) {
    super({ x, y, text: '' })
    this.timeIntervalInSeconds = timeIntervalInSeconds
    this.centerOnWidth = centerOnWidth
    this.nextUpdateTime = 0
  }

  async update() {
    await super.update()
    if (Date.now() < this.nextUpdateTime) {
      return
    }

    this.nextUpdateTime = Date.now() + this.timeIntervalInSeconds * 1000
    this.getBlockTime()
  }

  private async getBlockTime() {
    try {
      const response = await axios.get('https://mempool.space/api/blocks/tip/height')
      this.text = response.data
      if (this.centerOnWidth > 0) {
        this.centerTextOnWidth(this.centerOnWidth)
      }
    } catch {
      // Fail silently
      // eslint-disable-next-line no-console
      console.info('Failed to fetch block time from mempool.space')
    }
  }
}