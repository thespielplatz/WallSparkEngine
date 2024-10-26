import { type ConfigSchema, type DisplaySchema } from './Config'
import GameObject from './gameObjects/GameObject'
import PixelBuffer from './drawing/PixelBuffer'
import AbstractRenderer from './renderer/AbstractRenderer'
import ConsoleRenderer from './renderer/ConsoleRenderer'
import WledRenderer from './renderer/WledRenderer/WledRenderer'

const sleep = (timeout:number) => new Promise(res => setTimeout(res, timeout))

export default class GameEngine {
  private renderer: AbstractRenderer[] = []
  private fps = 60
  private frameDuration = 1000 / this.fps
  private gameObject: GameObject[] = []
  private pixelBuffer: PixelBuffer
  private config: ConfigSchema

  constructor(config: ConfigSchema) {
    this.config = config
    this.pixelBuffer = new PixelBuffer(config.width, config.height)
    this.initRenderers()
  }

  async run() {
    while (true) {
      const start = performance.now()

      await this.update()
      await this.draw()
      await this.render()

      const end = performance.now()
      const frameTime = end - start
      if (frameTime < this.frameDuration) {
        await sleep(this.frameDuration - frameTime)
      }
    }
  }

  public addGameObject(gameObject: GameObject) {
    this.gameObject.push(gameObject)
  }

  private initRenderers() {
    this.config.displays.forEach((display: DisplaySchema) => {
      if (display.active === false) {
        return
      }

      // eslint-disable-next-line no-console
      console.info(`Initializing display ${'name' in display ? display.name : '(noname)' } (${display.type})`)

      switch (display.type) {
        case 'console':
          this.renderer.push(new ConsoleRenderer({
            width: this.config.width,
            height: this.config.height,
            brightness: this.config.brightness,
          }))
          break

        case 'wled':
          this.renderer.push(new WledRenderer({
            width: this.config.width,
            height: this.config.height,
            brightness: this.config.brightness,
            name: display.name,
            host: display.host,
            port: display.port,
          }))
          break
      }
    })
  }

  private async update() {
    for (let gameObject of this.gameObject) {
      await gameObject.update()
    }
  }

  private async draw() {
    this.pixelBuffer.clear()
    for (let gameObject of this.gameObject) {
      this.pixelBuffer.transform(gameObject)
      await gameObject.draw(this.pixelBuffer)
    }
  }

  private async render() {
    await Promise.all(
      this.renderer.map(renderer => {
        renderer.render(this.pixelBuffer.getPixelData())
      }),
    )
  }
}
