import UDPSender from '@tsp/wse/GameEngine/renderer/WledRenderer/modules/UDPSender'
import AbstractRenderer from '@tsp/wse/GameEngine/renderer/AbstractRenderer'

export default class WledRenderer extends AbstractRenderer {
  private udpSender: UDPSender
  private messageBuffer: Buffer

  constructor({ name, host, port, width, height, brightness }: {
    name?: string,
    host: string,
    port: number,
    width: number,
    height: number,
    brightness: number
  }) {
    super({ width, height, brightness })
    // eslint-disable-next-line no-console
    console.info(`Connecting WledRenderer ${name ? `(${name}) ` : ''}@ ${host}:${port}`)

    this.udpSender = new UDPSender(host, port)

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

    await this.udpSender.send(this.messageBuffer)
  }
}
