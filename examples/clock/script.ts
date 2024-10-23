console.info('Example - Clock')

import GameEngine from '@/GameEngine/GameEngine'
import { Config } from '@/GameEngine/Config'

import Time from '@/Animations/Time'

const config = new Config()
const gameEngine = new GameEngine(config.config)

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
