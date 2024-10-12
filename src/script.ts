console.info('WLED UDP Control!')

import App from './lib/App'
import { Config } from './lib/Config'

import MovingPixel from './lib/animations/MovingPixel'

/*
const port = 21324
const host = '192.168.1.121'
const sender = new UDPSender(host, port)

const byte0 = 2
const byte1 = 2
const bufferSize = 2 + numberOfPixels * 3
const message = Buffer.alloc(bufferSize)
message[0] = byte0
message[1] = byte1

const sendData = async () => {
  for (let i = 0; i < animation.pixels.length; i++) {
    const pixel = animation.pixels[i]
    message[2 + i * 3] = (pixel >> 16) & 0xFF
    message[3 + i * 3] = (pixel >> 8) & 0xFF
    message[4 + i * 3] = pixel & 0xFF
  }

  await sender.send(message)
}
*/

const config = new Config()
const app = new App(config.config)
app.setAnimation(new MovingPixel(config.config.width, config.config.height))

;(async () => {
  await app.run()
})()
