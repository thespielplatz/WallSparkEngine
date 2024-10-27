// eslint-disable-next-line no-console
console.info('Example - Clock')

import GameEngine from '@tsp/wse/GameEngine/GameEngine'
import { Config } from '@tsp/wse/GameEngine/Config'
import Time from '@tsp/wse/Animations/Time'
import GameObject from '@tsp/wse/GameEngine/gameObjects/GameObject'

import { SateLogo } from '@shared/logos/SateLogo'
import { MinervaLogo } from '@shared/logos/MinervaLogo'
import { type LogoEnum, SceneSchema } from './sceneSchema'
import ILogo from '@shared/logos/ILogo'

const LOGO_PADDING = 1

const config = new Config()
const gameEngine = new GameEngine(config.config)

const scene = SceneSchema.parse(config.config.scene)

const time = new Time({
  x: 0,
  y: 0,
  showSeconds: scene.showSeconds,
})
time.centerOnWidth(config.config.width)

const getLogo = (logo: LogoEnum): GameObject & ILogo | null => {
  switch (logo) {
    case 'Sate':
      return new SateLogo()
    case 'Minerva':
      return new MinervaLogo()
  }

  return null
}

if (scene.leftLogo) {
  const leftLogo = getLogo(scene.leftLogo)
  if (leftLogo) {
    leftLogo.x = LOGO_PADDING
    gameEngine.addGameObject(leftLogo)
  }
}

if (scene.rightLogo) {
  const rightLogo = getLogo(scene.rightLogo)
  if (rightLogo) {
    rightLogo.x = config.config.width - rightLogo.width - 1 - LOGO_PADDING
    gameEngine.addGameObject(rightLogo)
  }
}

gameEngine.addGameObject(time as unknown as GameObject)

;(async () => {
  await gameEngine.run()
})()
