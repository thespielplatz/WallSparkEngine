import UDPSender from '../modules/UDPSender'
import AbstractRenderer from './AbstractRenderer'


export default class WledRenderer extends AbstractRenderer {
  private udpSender: UDPSender
  private messageBuffer: Buffer

  constructor(params: { 
    host: string,
    port: number,
    width: number, 
    height: number, 
    brightness: number 
  }) {
    super(params)
    console.info(`WledRenderer connecting to ${params.host}:${params.port}`)

    this.udpSender = new UDPSender(params.host, params.port)

    const numberOfPixels = params.width * params.height
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
      this.messageBuffer[2 + i * 3] = (pixel >> 16) & 0xFF
      this.messageBuffer[3 + i * 3] = (pixel >> 8) & 0xFF
      this.messageBuffer[4 + i * 3] = pixel & 0xFF
    }
  
    await this.udpSender.send(this.messageBuffer)  
  }
}
