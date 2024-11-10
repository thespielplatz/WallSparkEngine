import { LogoEnum } from '@shared/logos/logo'
import { z } from 'zod'

const cronPattern = /^(\*|([0-5]?\d)) (\*|([01]?\d|2[0-3])) (\*|([01]?\d|2[0-3])) (\*|([0-2]?\d|3[01])) (\*|([0-1]?\d|2[0-3]))$/

export const SceneSchema = z.object({
  'showSeconds': z.boolean().default(true),
  'leftLogo': LogoEnum.optional(),
  'rightLogo': LogoEnum.optional(),
  'terminateCron': z.string().regex(cronPattern, {
    message: "Invalid cron expression format. Expected format: '* * * * *' (minute hour day month dayOfWeek)",
  }).optional(),
  'turnOffCron': z.string().regex(cronPattern, {
    message: "Invalid cron expression format. Expected format: '* * * * *' (minute hour day month dayOfWeek)",
  }).optional(),
  'turnOnCron': z.string().regex(cronPattern, {
    message: "Invalid cron expression format. Expected format: '* * * * *' (minute hour day month dayOfWeek)",
  }).optional(),
}).default({})

export type SceneSchema = z.infer<typeof SceneSchema>
