import { type ConfigSchema, type DisplaySchema } from '@tsp/wse/GameEngine/Config'
import GameObject from '@tsp/wse/GameObjects/GameObject'
import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import AbstractRenderer from '@tsp/wse/GameEngine/renderer/AbstractRenderer'
import ConsoleRenderer from '@tsp/wse/GameEngine/renderer/ConsoleRenderer'
import WledRenderer from '@tsp/wse/GameEngine/renderer/WledRenderer/WledRenderer'

const sleep = (timeout:number) => new Promise(res => setTimeout(res, timeout))

export default class GameEngine {
  private renderer: AbstractRenderer[] = []
  private fps = 60
  private frameDuration = 1000 / this.fps
  private gameObject: GameObject[] = []
  private pixelBuffer: PixelBuffer
  private config: ConfigSchema
  private isRunning
  isRendering: boolean

  constructor(config: ConfigSchema) {
    this.config = config
    this.pixelBuffer = new PixelBuffer(config.width, config.height)
    this.initRenderers()
    this.isRunning = true
    this.isRendering = true
  }

  async run() {
    while (this.isRunning) {
      const start = performance.now()

      await this.update()
      await this.draw()
      await this.render()

      const end = performance.now()
      const frameTime = end - start
      if (frameTime < this.frameDuration) {
        await sleep(this.frameDuration - frameTime)
      } else {
        await sleep(1)
      }
    }
  }

  public stop() {
    this.isRunning = false
  }

  public addGameObject(gameObject: GameObject) {
    this.gameObject.push(gameObject)
  }

  private initRenderers() {
    this.config.displays.forEach((display: DisplaySchema) => {
      if (display.active === false) {
        return
      }

      switch (display.type) {
        case 'console':
          // eslint-disable-next-line no-console
          console.info('Initializing ConsoleRenderer')
          this.renderer.push(new ConsoleRenderer({
            width: this.config.width,
            height: this.config.height,
            brightness: display.brightness,
          }))
          break

        case 'wled':
          // eslint-disable-next-line no-console
          console.info(`Connecting WledRenderer ${display.name ? `(${display.name}) ` : ''}@ ${display.host}:${display.port}`)
          this.renderer.push(new WledRenderer({
            width: this.config.width,
            height: this.config.height,
            name: display.name,
            host: display.host,
            port: display.port,
            brightness: display.brightness,
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
    if (!this.isRendering) {
      return
    }
    await Promise.all(
      this.renderer.map(renderer => {
        renderer.render(this.pixelBuffer.getPixelData())
      }),
    )
  }
}
