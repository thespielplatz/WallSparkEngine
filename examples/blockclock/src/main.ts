// eslint-disable-next-line no-console
console.info('Example - BlockClock')

import GameEngine from '@tsp/wse/GameEngine/GameEngine'
import { Config } from '@tsp/wse/GameEngine/Config'
import GameObject from '@tsp/wse/GameEngine/gameObjects/GameObject'

import { SateLogo } from '@shared/logos/SateLogo'
import BlockTime from './gameObjects/BlockTime'
import ILogo from '@shared/logos/ILogo'

const LOGO_PADDING = 1

const config = new Config()
const gameEngine = new GameEngine(config.config)

const blocktime = new BlockTime({
  centerOnWidth: config.config.width,
})

const sateLogoLeft = new SateLogo({
  x: LOGO_PADDING,
})

const sateLogoRight: GameObject & ILogo = new SateLogo()
sateLogoRight.x = config.config.width - sateLogoRight.width - LOGO_PADDING

gameEngine.addGameObject(sateLogoLeft)
gameEngine.addGameObject(sateLogoRight)
gameEngine.addGameObject(blocktime)

;(async () => {
  await gameEngine.run()
})()
