// eslint-disable-next-line no-console
console.info('Example - Clock')

import { CronJob, sendAt as cronSendAt } from 'cron'

import GameEngine from '@tsp/wse/GameEngine/GameEngine'
import { Config } from '@tsp/wse/GameEngine/Config'
import Time from '@tsp/wse/GameObjects/Animations/Time'
import GameObject from '@tsp/wse/GameObjects/GameObject'

import SateLogo from '@shared/logos/SateLogo'
import MinervaLogo from '@shared/logos/MinervaLogo'
import ILogo from '@shared/logos/ILogo'

import { type LogoEnum, SceneSchema } from './sceneSchema'

const LOGO_PADDING = 1

let customConfigFile: string | undefined = undefined

if (process.argv.length > 2) {
  customConfigFile = process.argv[2]
}

const config = new Config({ configFile: customConfigFile })
const gameEngine = new GameEngine(config.config)

const scene = SceneSchema.parse(config.config.scene)

const time = new Time({
  x: 0,
  y: 0,
  showSeconds: scene.showSeconds,
  centerOnWidth: config.config.width,
})

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
    rightLogo.x = config.config.width - rightLogo.width - LOGO_PADDING
    gameEngine.addGameObject(rightLogo)
  }
}

gameEngine.addGameObject(time)

let terminateJob = null
if (scene.terminateCron) {
  // Terimate at second 1, so that the time is displayed for the full minute
  const cronPattern = `01 ${scene.terminateCron}`
  terminateJob = CronJob.from({
    cronTime: cronPattern,
    onTick: () => {
      gameEngine.stop()
    },
    start: true,
  })
  const dt = cronSendAt(cronPattern )
  // eslint-disable-next-line no-console
  console.info(`The app will terminate at: ${dt.toISO()}`)
}

gameEngine.start()
gameEngine.on(GameEngine.EVENT_STOPPED, () => {
  if (terminateJob) {
    terminateJob.stop()
  }
  process.exit(0)
})
