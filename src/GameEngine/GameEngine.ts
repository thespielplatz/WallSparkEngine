import { type ConfigSchema, type DisplaySchema } from '@tsp/wse/GameEngine/Config'
import GameObject from '@tsp/wse/GameObjects/GameObject'
import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import AbstractRenderer from '@tsp/wse/GameEngine/renderer/AbstractRenderer'
import ConsoleRenderer from '@tsp/wse/GameEngine/renderer/ConsoleRenderer'
import WledRenderer from '@tsp/wse/GameEngine/renderer/WledRenderer/WledRenderer'
import { EventEmitter } from 'stream'

const sleep = (timeout:number) => new Promise(res => setTimeout(res, timeout))

export default class GameEngine extends EventEmitter {
  static EVENT_STOPPED = 'stopped'

  private renderer: AbstractRenderer[] = []
  private fps = 60
  private frameDuration = 1000 / this.fps
  private gameObjects: GameObject[] = []
  private pixelBuffer: PixelBuffer
  private config: ConfigSchema
  private isRunning
  private lastRunTime: number = -1
  isRendering: boolean

  constructor(config: ConfigSchema) {
    super()
    this.config = config
    this.pixelBuffer = new PixelBuffer(config.width, config.height)
    this.initRenderers()
    this.isRunning = true
    this.isRendering = true
  }

  start() {
    this.scheduleNextRun()
  }

  private scheduleNextRun() {
    // Info about the game loop
    // Resource #1: https://nodejs.org/en/learn/asynchronous-work/understanding-setimmediate
    // Resource #2: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#setimmediate-vs-settimeout
    setImmediate(async () => {
      await this.run()
    })
  }

  private async run() {
    const start = performance.now()

    const deltaTime = this.lastRunTime <= 0 ? 0 : (performance.now() - this.lastRunTime) / 1000
    this.lastRunTime = performance.now()

    await this.update(deltaTime)
    await this.draw()
    await this.render()

    const end = performance.now()
    const frameTime = end - start

    if (frameTime < this.frameDuration) {
      await sleep(this.frameDuration - frameTime)
    }

    if (this.isRunning) {
      this.scheduleNextRun()
    } else {
      this.emit(GameEngine.EVENT_STOPPED)
    }
  }

  public stop() {
    this.isRunning = false
  }

  public addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject)
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

  private async update(deltaTime: number) {
    for (let gameObject of this.gameObjects) {
      await gameObject.update(deltaTime)
    }
  }

  private async draw() {
    this.pixelBuffer.clear()
    for (let gameObject of this.gameObjects) {
      if (gameObject.visible === false) {
        continue
      }
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
