import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import GameObject from '@tsp/wse/GameObjects/GameObject'

import ILogo from '@shared/logos/ILogo'
import { BLACK } from '@tsp/wse/GameEngine/drawing/colors'

const GRAY = 0x4a4a4a
const YELLOW = 0xffc800

export default class TheSpielplatzLogo extends GameObject implements ILogo {
  get width(): number {
    return 5
  }

  get height(): number {
    return 5
  }

  async draw(pixelBuffer: PixelBuffer) {
    pixelBuffer.setPixel({ x: 0, y: 0, color: GRAY })
    pixelBuffer.setPixel({ x: 1, y: 0, color: GRAY })
    pixelBuffer.setPixel({ x: 2, y: 0, color: GRAY })
    pixelBuffer.setPixel({ x: 3, y: 0, color: YELLOW })
    pixelBuffer.setPixel({ x: 4, y: 0, color: YELLOW })

    pixelBuffer.setPixel({ x: 0, y: 1, color: YELLOW })
    pixelBuffer.setPixel({ x: 1, y: 1, color: GRAY })
    pixelBuffer.setPixel({ x: 2, y: 1, color: YELLOW })
    pixelBuffer.setPixel({ x: 3, y: 1, color: YELLOW })
    pixelBuffer.setPixel({ x: 4, y: 1, color: YELLOW })

    pixelBuffer.setPixel({ x: 0, y: 2, color: BLACK })
    pixelBuffer.setPixel({ x: 1, y: 2, color: GRAY })
    pixelBuffer.setPixel({ x: 2, y: 2, color: BLACK })
    pixelBuffer.setPixel({ x: 3, y: 2, color: BLACK })
    pixelBuffer.setPixel({ x: 4, y: 2, color: BLACK })

    pixelBuffer.setPixel({ x: 0, y: 3, color: BLACK })
    pixelBuffer.setPixel({ x: 1, y: 3, color: GRAY })
    pixelBuffer.setPixel({ x: 2, y: 3, color: BLACK })
    pixelBuffer.setPixel({ x: 3, y: 3, color: YELLOW })
    pixelBuffer.setPixel({ x: 4, y: 3, color: BLACK })

    pixelBuffer.setPixel({ x: 0, y: 4, color: BLACK })
    pixelBuffer.setPixel({ x: 1, y: 4, color: BLACK })
    pixelBuffer.setPixel({ x: 2, y: 4, color: BLACK })
    pixelBuffer.setPixel({ x: 3, y: 4, color: YELLOW })
    pixelBuffer.setPixel({ x: 4, y: 4, color: BLACK })
  }
}
