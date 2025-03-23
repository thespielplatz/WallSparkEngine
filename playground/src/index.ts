/* eslint-disable no-console */
import { colors, Config, GameEngine, Rainbow, Time } from '@thespielplatz/wall-spark-engine'

console.info('Playground Example: Rainbow Clock')

console.log(`Test: ${colors.BLACK}`)

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
