import { z } from 'zod'

import GameObject from '@tsp/wse/GameObjects/GameObject'

import SateLogo from '@shared/logos/SateLogo'
import MinervaLogo from '@shared/logos/MinervaLogo'
import WallSpark from '@shared/logos/WallSparkLogo'
import TheSpielplatz from '@shared/logos/TheSpielplatzLogo'
import ILogo from '@shared/logos/ILogo'
import EgAustria from './EgAustria'

export const LogoEnum = z.enum(['Sate', 'Minerva', 'WallSpark', 'TheSpielplatz', 'EgAustria'])
export type LogoEnum = z.infer<typeof LogoEnum>

export const getLogo = (logo: LogoEnum): GameObject & ILogo => {
  switch (logo) {
    case 'Sate':
      return new SateLogo()
    case 'Minerva':
      return new MinervaLogo()
    case 'WallSpark':
      return new WallSpark()
    case 'TheSpielplatz':
      return new TheSpielplatz()
    case 'EgAustria':
      return new EgAustria()
  }
}
