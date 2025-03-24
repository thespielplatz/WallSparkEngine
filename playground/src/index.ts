/* eslint-disable no-console */
import { colors, Config, Fill, GameEngine, Rainbow, Rectangle, Time } from '@thespielplatz/wall-spark-engine'

console.info('Playground Example: Rainbow Clock')

console.log(`Test: ${colors.BLACK}`)

const config = new Config()
const gameEngine = new GameEngine(config.config)
const blackBackground = new Fill({
  color: colors.BLACK,
})
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

gameEngine.addGameObject(blackBackground)
gameEngine.addGameObject(rainbow)
gameEngine.addGameObject(new Rectangle({ x: 0, y: 0, width: 5, height: 5, color: colors.RED }))
gameEngine.addGameObject(new Rectangle({ x: 5, y: 0, width: 5, height: 5, color: colors.GREEN }))
gameEngine.addGameObject(new Rectangle({ x: 10, y: 0, width: 5, height: 5, color: colors.BLUE }))
gameEngine.addGameObject(time)

gameEngine.start()
gameEngine.on(GameEngine.EVENT_STOPPED, () => {
  process.exit(0)
})

setInterval(() => {
  rainbow.visible = !rainbow.visible
}
, 2000)
