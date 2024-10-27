// eslint-disable-next-line no-console
console.info('Example - Basic')

import GameEngine from '@tsp/wse/GameEngine/GameEngine'
import { Config } from '@tsp/wse/GameEngine/Config'

import Rainbow from '@tsp/wse/Animations/Rainbow'
import Time from '@tsp/wse/Animations/Time'

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
})
time.centerOnWidth(config.config.width)

gameEngine.addGameObject(rainbow)
gameEngine.addGameObject(time)

;(async () => {
  await gameEngine.run()
})()
