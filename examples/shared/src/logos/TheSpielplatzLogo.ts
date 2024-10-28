import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import GameObject from '@tsp/wse/GameEngine/gameObjects/GameObject'

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
    pixelBuffer.setPixel(0, 0, GRAY)
    pixelBuffer.setPixel(1, 0, GRAY)
    pixelBuffer.setPixel(2, 0, GRAY)
    pixelBuffer.setPixel(3, 0, YELLOW)
    pixelBuffer.setPixel(4, 0, YELLOW)

    pixelBuffer.setPixel(0, 1, YELLOW)
    pixelBuffer.setPixel(1, 1, GRAY)
    pixelBuffer.setPixel(2, 1, YELLOW)
    pixelBuffer.setPixel(3, 1, YELLOW)
    pixelBuffer.setPixel(4, 1, YELLOW)

    pixelBuffer.setPixel(0, 2, BLACK)
    pixelBuffer.setPixel(1, 2, GRAY)
    pixelBuffer.setPixel(2, 2, BLACK)
    pixelBuffer.setPixel(3, 2, BLACK)
    pixelBuffer.setPixel(4, 2, BLACK)

    pixelBuffer.setPixel(0, 3, BLACK)
    pixelBuffer.setPixel(1, 3, GRAY)
    pixelBuffer.setPixel(2, 3, BLACK)
    pixelBuffer.setPixel(3, 3, YELLOW)
    pixelBuffer.setPixel(4, 3, BLACK)

    pixelBuffer.setPixel(0, 4, BLACK)
    pixelBuffer.setPixel(1, 4, BLACK)
    pixelBuffer.setPixel(2, 4, BLACK)
    pixelBuffer.setPixel(3, 4, YELLOW)
    pixelBuffer.setPixel(4, 4, BLACK)
  }
}
