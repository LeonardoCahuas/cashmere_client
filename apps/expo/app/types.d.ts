import { config } from '@siva/config'

export type Conf = typeof config

export const rentalDurations = ['short_term', 'long_term'] as const

declare module '@siva/ui' {
  interface TamaguiCustomConfig extends Conf {}
}
