import * as dgram from 'dgram'

export default class UDPSender {
  private socket: dgram.Socket
  private _host: string
  private _port: number

  constructor(host: string, port: number) {
    this._host = host
    this._port = port
    this.socket = dgram.createSocket('udp4')
  }

  get host() {
    return this._host
  }

  get port() {
    return this._port
  }

  async send(message: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.send(message, this._port, this._host, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  close() {
    this.socket.close()
  }
}
