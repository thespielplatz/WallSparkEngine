console.info('Example - Clock')

import GameEngine from '@/GameEngine/GameEngine'
import { Config } from '@/GameEngine/Config'

import BlockTime from './gameObjects/BlockTime'
import { SateLogo } from 'examples/lib/logos/SateLogo'

const config = new Config()
const gameEngine = new GameEngine(config.config)

const blocktime = new BlockTime({
  centerOnWidth: config.config.width,
})

const sateLogoLeft = new SateLogo({
  x: 1,
})

const sateLogoRight = new SateLogo({
  x: config.config.width - SateLogo.width - 1,
})

gameEngine.addGameObject(sateLogoLeft)
gameEngine.addGameObject(sateLogoRight)
gameEngine.addGameObject(blocktime)

;(async () => {
  await gameEngine.run()
})()
