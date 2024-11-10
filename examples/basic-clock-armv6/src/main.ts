// eslint-disable-next-line no-console
console.info('Example - Clock armv6')

import GameEngine from '@tsp/wse/GameEngine/GameEngine'
import { Config } from '@tsp/wse/GameEngine/Config'
import Time from '@tsp/wse/GameObjects/Animations/Time'

let customConfigFile: string | undefined = undefined

const config = new Config({ configFile: customConfigFile })
const gameEngine = new GameEngine(config.config)

const time = new Time({
  x: 0,
  y: 0,
  centerOnWidth: config.config.width,
})
gameEngine.addGameObject(time)

gameEngine.start()
gameEngine.on(GameEngine.EVENT_STOPPED, () => {
  process.exit(0)
})
