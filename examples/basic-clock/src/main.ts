// eslint-disable-next-line no-console
console.info('Example - Clock')

import GameEngine from '@tsp/wse/GameEngine/GameEngine'
import { Config } from '@tsp/wse/GameEngine/Config'
import Time from '@tsp/wse/Animations/Time'
import GameObject from '@tsp/wse/GameEngine/gameObjects/GameObject'

import { SateLogo } from '@shared/logos/SateLogo'
import { MinervaLogo } from '@shared/logos/MinervaLogo'

const config = new Config()
const gameEngine = new GameEngine(config.config)

const time = new Time({
  x: 0,
  y: 0,
  showSeconds: true,
})
time.centerOnWidth(config.config.width)

const sateLogo = new SateLogo({
  x: 1,
})

const minervaLogo = new MinervaLogo({
  x: config.config.width - MinervaLogo.width - 1 - 1,
})

gameEngine.addGameObject(sateLogo)
gameEngine.addGameObject(minervaLogo)
gameEngine.addGameObject(time as unknown as GameObject)

;(async () => {
  await gameEngine.run()
})()
