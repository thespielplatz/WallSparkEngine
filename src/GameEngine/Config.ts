import fs from 'fs'
import path from 'path'
import { z } from 'zod'

const ConsoleSchema = z.object({
  active: z.boolean().default(true),
  type: z.literal('console'),
  brightness: z.number().min(0).max(255).default(255),
})

const WledSchema = z.object({
  name: z.string().optional(),
  active: z.boolean().default(true),
  type: z.literal('wled'),
  host: z.string(),
  port: z.number().default(21324),
  brightness: z.number().min(0).max(255).default(255),
})

const DisplaySchema = z.union([ConsoleSchema, WledSchema])

const ConfigSchema = z.object({
  width: z.number(),
  height: z.number(),
  displays: z.array(DisplaySchema),
  scene: z.any().optional().describe('Scene to render. Is a "any" slot for projects to define their own scenes'),
})

export type DisplaySchema = z.infer<typeof DisplaySchema>
export type ConfigSchema = z.infer<typeof ConfigSchema>

export class Config {
  private values: ConfigSchema

  constructor({ configFile = 'config.json' }: { configFile?: string} = {}) {
    const configPath = path.resolve(process.cwd(), configFile)
    const configJson = fs.readFileSync(configPath, 'utf-8')

    try {
      this.values = ConfigSchema.parse(JSON.parse(configJson))
    } catch (error) {
      console.error('Error parsing config! Check config.json.example and the following error:')
      throw new Error(`Error parsing config: ${error}`)
    }
    // eslint-disable-next-line no-console
    console.info('Config is valid:', this.values)
  }

  get config() {
    return this.values
  }
}
