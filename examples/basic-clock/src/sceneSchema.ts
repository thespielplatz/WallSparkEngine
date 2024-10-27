import { z } from 'zod'

export const LogoEnum = z.enum(['Sate', 'Minerva'])
export type LogoEnum = z.infer<typeof LogoEnum>

export const SceneSchema = z.object({
  'showSeconds': z.boolean().default(true),
  'leftLogo': LogoEnum.optional(),
  'rightLogo': LogoEnum.optional(),
}).default({})

export type SceneSchema = z.infer<typeof SceneSchema>
