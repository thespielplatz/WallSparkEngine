console.info('WLED UDP Control!')

import Animation from './lib/Animation'
import MovingPixel from './lib/MovingPixel'
import ConsoleRenderer from './lib/renderer/ConsoleRenderer'
import TetrisAnimation from './lib/TetrisAnimation'
import UDPSender from './lib/UDPSender'

const width = 50
const height = 5
const numberOfPixels = width * height
const animation: Animation = new MovingPixel(width, height)

const sleep = (timeout:number) => new Promise(res => setTimeout(res, timeout))

const port = 21324
const host = '192.168.1.121'
const sender = new UDPSender(host, port)
const consoleRenderer = new ConsoleRenderer({ width, height, brightness: 255 })

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

;(async () => {
  while (true) {
    animation.nextFrame()
    consoleRenderer.render(animation.pixels)
    //await sendData()
    await sleep(50)
  }
})()
