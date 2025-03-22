/* eslint-disable no-console */
import { GameEngine, Config, Rainbow, Time } from 'wall-spark-engine'

console.info('Playground Game Engine')

const config = new Config()
const gameEngine = new GameEngine(config.config)
const rainbow = new Rainbow({
  x: 0,
  y: 0,
  width: config.config.width,
  height: config.config.height,
  speed: 0.25,
})
const time = new Time({
  x: 0,
  y: 0,
  centerOnWidth: config.config.width,
})

gameEngine.addGameObject(rainbow)
gameEngine.addGameObject(time)

gameEngine.start()
gameEngine.on(GameEngine.EVENT_STOPPED, () => {
  process.exit(0)
})
