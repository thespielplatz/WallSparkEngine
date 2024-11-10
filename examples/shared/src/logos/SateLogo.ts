import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import GameObject from '@tsp/wse/GameObjects/GameObject'

import ILogo from '@shared/logos/ILogo'

export default class SateLogo extends GameObject implements ILogo {
  get width(): number {
    return 3
  }

  get height(): number {
    return 5
  }

  async draw(pixelBuffer: PixelBuffer) {
    pixelBuffer.setPixel({ x: 0, y: 0, color: 0xfc0052 })
    pixelBuffer.setPixel({ x: 1, y: 0, color: 0xff0736 })
    pixelBuffer.setPixel({ x: 2, y: 0, color: 0xff330a })

    pixelBuffer.setPixel({ x: 0, y: 1, color: 0xe5027f })

    pixelBuffer.setPixel({ x: 0, y: 2, color: 0xe70078 })
    pixelBuffer.setPixel({ x: 1, y: 2, color: 0xeb0070 })
    pixelBuffer.setPixel({ x: 2, y: 2, color: 0xf4005b })

    pixelBuffer.setPixel({ x: 2, y: 3, color: 0xf60057 })

    pixelBuffer.setPixel({ x: 0, y: 4, color: 0xbd198a })
    pixelBuffer.setPixel({ x: 1, y: 4, color: 0xcf0b82 })
    pixelBuffer.setPixel({ x: 2, y: 4, color: 0xde027b })
  }
}
