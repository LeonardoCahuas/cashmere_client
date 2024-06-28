// biome-ignore lint/style/useImportType: <explanation>
import { config } from '@siva/config'

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
