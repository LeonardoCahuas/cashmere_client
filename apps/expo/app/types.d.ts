import { config } from '@siva/config'

export type Conf = typeof config

declare module '@siva/ui' {
  interface TamaguiCustomConfig extends Conf {}
}
