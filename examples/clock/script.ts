console.info('Example Clock!')

import GameEngine from '@/GameEngine/GameEngine'
import { Config } from '@/GameEngine/Config'

import MovingPixel from '@/Animations/MovingPixel'
import BlockFound from '@/Animations/BlockFound'
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

//gameEngine.addGameObject(rainbow)
//gameEngine.addGameObject(movingPixel)
//gameEngine.addGameObject(blockFound)

const time = new Time({
  x: 0,
  y: 0,
  showSeconds: false,
})
time.centerOnWidth(config.config.width)

gameEngine.addGameObject(time)

;(async () => {
  await gameEngine.run()
})()
