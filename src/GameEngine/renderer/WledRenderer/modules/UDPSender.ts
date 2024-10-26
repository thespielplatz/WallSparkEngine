import * as dgram from 'dgram'

export default class UDPSender {
  private client: dgram.Socket
  private host: string
  private port: number

  constructor(host: string, port: number) {
    this.host = host
    this.port = port
    this.client = dgram.createSocket('udp4')
  }

  async send(message: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.send(message, this.port, this.host, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  close() {
    this.client.close()
  }
}
