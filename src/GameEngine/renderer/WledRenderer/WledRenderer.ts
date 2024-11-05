import UDPSender from '@tsp/wse/GameEngine/renderer/WledRenderer/modules/UDPSender'
import AbstractRenderer from '@tsp/wse/GameEngine/renderer/AbstractRenderer'

const ERROR_CODE_EHOSTUNREACH = -65
const ERROR_CODE_EADDRNOTAVAIL = -51
const ERROR_CODES = [ERROR_CODE_EHOSTUNREACH, ERROR_CODE_EADDRNOTAVAIL]

export default class WledRenderer extends AbstractRenderer {
  private udpSender: UDPSender
  private messageBuffer: Buffer
  private name
  private connected = true

  constructor({ name, host, port, width, height, brightness }: {
    name?: string,
    host: string,
    port: number,
    width: number,
    height: number,
    brightness: number
  }) {
    super({ width, height, brightness })
    this.udpSender = new UDPSender(host, port)
    this.name = name

    const numberOfPixels = width * height
    const bufferSize = 2 + numberOfPixels * 3
    this.messageBuffer = Buffer.alloc(bufferSize)

    this.initBuffer()
  }

  private initBuffer() {
    const byte0 = 2
    const byte1 = 2
    this.messageBuffer[0] = byte0
    this.messageBuffer[1] = byte1
  }

  async render(pixelData: number[]) {
    for (let i = 0; i < pixelData.length; i++) {
      const pixel = pixelData[i]
      this.messageBuffer[2 + i * 3] = ((pixel >> 16) & 0xFF) * this.brightness / 255
      this.messageBuffer[3 + i * 3] = ((pixel >> 8) & 0xFF) * this.brightness / 255
      this.messageBuffer[4 + i * 3] = pixel & 0xFF * this.brightness / 255
    }

    try {
      await this.udpSender.send(this.messageBuffer)
      this.resumeConnectionInfo()
    } catch (e) {
      if (e as Error) {
        const error = e as Error
        if ('errno' in error && typeof error.errno == 'number' && ERROR_CODES.includes(error.errno)) {
          this.noConnectionInfo()
          // ignore error
          return
        }
      }
      throw e
    }
  }

  private resumeConnectionInfo() {
    if (this.connected) {
      return
    }
    this.connected = true
    // eslint-disable-next-line no-console
    console.info(`Reconnected to ${this.name} @ ${this.udpSender.host}:${this.udpSender.port}`)
  }

  private noConnectionInfo() {
    if (!this.connected) {
      return
    }
    this.connected = false
    // eslint-disable-next-line no-console
    console.info(`Disonnected from ${this.name} @ ${this.udpSender.host}:${this.udpSender.port}`)
  }
}
