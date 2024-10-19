console.info('WLED UDP Control!')

import GameEngine from './lib/GameEngine/GameEngine'
import { Config } from './lib/Config'

import MovingPixel from './lib/animations/MovingPixel'

const config = new Config()
const gameEngine = new GameEngine(config.config)

gameEngine.setAnimation(new MovingPixel(config.config.width, config.config.height))

;(async () => {
  await gameEngine.run()
})()
