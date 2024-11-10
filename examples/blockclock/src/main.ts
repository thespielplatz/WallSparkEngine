// eslint-disable-next-line no-console
console.info('Example - BlockClock')

import GameEngine from '@tsp/wse/GameEngine/GameEngine'
import { Config } from '@tsp/wse/GameEngine/Config'

import BlockTime from './GameObjects/BlockTime'
import { getLogo } from '@shared/logos/logo'

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

const logoLeft = getLogo('Sate')
logoLeft.x = LOGO_PADDING

const logoRight = getLogo('TheSpielplatz')
logoRight.x = config.config.width - logoRight.width - LOGO_PADDING

gameEngine.addGameObject(logoLeft)
gameEngine.addGameObject(logoRight)
gameEngine.addGameObject(blocktime)

gameEngine.start()
gameEngine.on(GameEngine.EVENT_STOPPED, () => {
  process.exit(0)
})
