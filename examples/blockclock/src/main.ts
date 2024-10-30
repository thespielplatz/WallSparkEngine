// eslint-disable-next-line no-console
console.info('Example - BlockClock')

import GameEngine from '@tsp/wse/GameEngine/GameEngine'
import { Config } from '@tsp/wse/GameEngine/Config'
import GameObject from '@tsp/wse/GameEngine/gameObjects/GameObject'

import SateLogo from '@shared/logos/SateLogo'
import ILogo from '@shared/logos/ILogo'
import TheSpielplatzLogo from '@shared/logos/TheSpielplatzLogo'

import BlockTime from './gameObjects/BlockTime'

const LOGO_PADDING = 1

let customConfigFile: string | undefined = undefined

if (process.argv.length > 2) {
  customConfigFile = process.argv[2]
}

const config = new Config({ configFile: customConfigFile })
const gameEngine = new GameEngine(config.config)

const blocktime = new BlockTime({
  centerOnWidth: config.config.width,
})

const logoLeft = new SateLogo({
  x: LOGO_PADDING,
})

const logoRight: GameObject & ILogo = new TheSpielplatzLogo()
logoRight.x = config.config.width - logoRight.width - LOGO_PADDING

gameEngine.addGameObject(logoLeft)
gameEngine.addGameObject(logoRight)
gameEngine.addGameObject(blocktime)

;(async () => {
  await gameEngine.run()
})()
