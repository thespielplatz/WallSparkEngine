console.info('Example - Basic')

import GameEngine from '@/GameEngine/GameEngine'
import { Config } from '@/GameEngine/Config'

import Rainbow from '@/Animations/Rainbow'
import Time from '@/Animations/Time'

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
