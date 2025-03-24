import type GameEngine from '@tsp/wse/GameEngine/GameEngine'
import GameObject from '@tsp/wse/GameObjects/GameObject'
import { CronJob, sendAt as cronSendAt } from 'cron'
import { z } from 'zod'

const cronPattern = /^(\*|([0-5]?\d)) (\*|([01]?\d|2[0-3])) (\*|([01]?\d|2[0-3])) (\*|([0-2]?\d|3[01])) (\*|([0-1]?\d|2[0-3]))$/
const cronType = z.string().regex(cronPattern, {
  message: "Invalid cron expression format. Expected format: '* * * * *' (minute hour day month dayOfWeek)",
}).optional()

export default class GameEngineController extends GameObject {
  private gameEngine: GameEngine
  private turnOffCronJob?: CronJob
  private turnOnCronJob?: CronJob

  constructor({
    gameEngine,
    turnOffCron,
    turnOnCron,
  }: {
    gameEngine: GameEngine,
    turnOffCron?: string,
    turnOnCron?: string
  }) {
    super()
    this.gameEngine = gameEngine
    this.initTurnOnCronJob(turnOnCron)
    this.initTurnOffCronJob(turnOffCron)
    this.initRenderEngineState()
  }

  private initTurnOnCronJob(turnOnCron?: string) {
    if (turnOnCron) {
      cronType.parse(turnOnCron)
      const cronPattern = `00 ${turnOnCron}`
      this.turnOnCronJob = CronJob.from({
        cronTime: cronPattern,
        onTick: () => {
          this.gameEngine.isRendering = true
        },
        start: true,
      })
      const dt = cronSendAt(cronPattern)
      // eslint-disable-next-line no-console
      console.info(`The rendering will turn on at: ${dt.toISO()}`)
    }
  }

  private initTurnOffCronJob(turnOffCron?: string) {
    if (turnOffCron) {
      cronType.parse(turnOffCron)
      const cronPattern = `00 ${turnOffCron}`
      this.turnOffCronJob = CronJob.from({
        cronTime: cronPattern,
        onTick: () => {
          this.gameEngine.isRendering = false
        },
        start: true,
      })
      const dt = cronSendAt(cronPattern)
      // eslint-disable-next-line no-console
      console.info(`The rendering will turn off at: ${dt.toISO()}`)
    }
  }

  private initRenderEngineState() {
    if (this.turnOnCronJob && this.turnOffCronJob) {
      if (this.turnOffCronJob.nextDate() > this.turnOnCronJob.nextDate()) {
        // eslint-disable-next-line no-console
        console.info('Detected off phase, turning rendering off')
        this.gameEngine.isRendering = false
      }
    }
  }
}
