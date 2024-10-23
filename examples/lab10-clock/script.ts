console.info('Example - Clock')

import GameEngine from '@/GameEngine/GameEngine'
import { Config } from '@/GameEngine/Config'

import Time from '@/Animations/Time'
import { SateLogo } from '../lib/logos/SateLogo'
import { MinervaLogo } from '../lib/logos/MinervaLogo'

const config = new Config()
const gameEngine = new GameEngine(config.config)

const time = new Time({
  x: 0,
  y: 0,
})
time.centerOnWidth(config.config.width)

const sateLogo = new SateLogo({
  x: 1,
})

const minervaLogo = new MinervaLogo({
  x: config.config.width - MinervaLogo.width - 1 - 1
})

gameEngine.addGameObject(sateLogo)
gameEngine.addGameObject(minervaLogo)
gameEngine.addGameObject(time)

;(async () => {
  await gameEngine.run()
})()
