import Animation from '../animations/Animation'
import { type ConfigSchema } from '../Config'
import AbstractRenderer from './renderer/AbstractRenderer'
import ConsoleRenderer from './renderer/ConsoleRenderer'
import WledRenderer from './renderer/WledRenderer/WledRenderer'

const sleep = (timeout:number) => new Promise(res => setTimeout(res, timeout))

export default class GameEngine {
  private renderer: AbstractRenderer[] = []
  private animation: Animation | null = null
  private fps = 60
  private frameDuration = 1000 / this.fps

  private config: ConfigSchema
  constructor(config: ConfigSchema) {
    this.config = config
    this.initRenderer()
  }

  public setAnimation(animation: Animation) {
    this.animation = animation
  }

  async run() {
    while (true) {
      const start = performance.now()

      await this.render()

      const end = performance.now()
      const frameTime = end - start
      if (frameTime < this.frameDuration) {
        await sleep(this.frameDuration - frameTime)
      }
    }
  }

  private initRenderer() {
    this.config.displays.forEach(display => {
      if (display.active === false) {
        return
      }

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
            host: display.host, 
            port: display.port,
           }))
          break
      }
    })
  }

  private async render() {
    if (this.animation != null) {
      this.animation.nextFrame()
      await Promise.all(
        this.renderer.map(renderer => {
          renderer.render(this.animation?.pixels || [])
        })
      )
    }
  }
}