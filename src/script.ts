console.info('WLED UDP Control!')

import GameEngine from './lib/GameEngine/GameEngine'
import { Config } from './lib/Config'

import MovingPixel from './lib/animations/MovingPixel'
import BlockFound from './lib/animations/BlockFound'
import Rainbow from './lib/animations/Rainbow'
import Time from './lib/animations/Time'

const config = new Config()
const gameEngine = new GameEngine(config.config)
const rainbow = new Rainbow({
  x: 0,
  y: 0,
  width: config.config.width,
  height: config.config.height,
  speed: 0.25,
})
const movingPixel = new MovingPixel({
  x: 0,
  y: 0,
  width: config.config.width,
  height: config.config.height,
})
const blockFound = new BlockFound({
  x: 10,
  y: 0,
  width: config.config.width,
  height: config.config.height,
  //speed: 0.5,
})

gameEngine.addGameObject(rainbow)
gameEngine.addGameObject(movingPixel)
//gameEngine.addGameObject(blockFound)

const time = new Time({
  x: 0,
  y: 0,
  showSeconds: true,
})
time.centerOnWidth(config.config.width)

gameEngine.addGameObject(time)

;(async () => {
  await gameEngine.run()
})()
