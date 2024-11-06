import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import GameObject from '@tsp/wse/GameObjects/GameObject'

import ILogo from '@shared/logos/ILogo'

export default class MinervaLogo extends GameObject implements ILogo {
  get width(): number {
    return 7
  }

  get height(): number {
    return 5
  }

  async draw(pixelBuffer: PixelBuffer) {
    pixelBuffer.setPixel(0, 0, 0x754eca)
    pixelBuffer.setPixel(1, 0, 0x754eca)
    pixelBuffer.setPixel(0, 1, 0x754eca)
    pixelBuffer.setPixel(0, 2, 0x754eca)
    pixelBuffer.setPixel(0, 3, 0x754eca)
    pixelBuffer.setPixel(0, 4, 0x754eca)
    pixelBuffer.setPixel(1, 4, 0x754eca)
    pixelBuffer.setPixel(2, 1, 0x754eca)

    pixelBuffer.setPixel(2, 4, 0x6249ca)
    pixelBuffer.setPixel(3, 0, 0x6249ca)
    pixelBuffer.setPixel(3, 3, 0x6249ca)
    pixelBuffer.setPixel(3, 4, 0x6249ca)
    pixelBuffer.setPixel(4, 1, 0x6249ca)
    pixelBuffer.setPixel(4, 4, 0x6249ca)

    pixelBuffer.setPixel(5, 0, 0x4341ca)
    pixelBuffer.setPixel(6, 0, 0x4341ca)
    pixelBuffer.setPixel(6, 1, 0x4341ca)
    pixelBuffer.setPixel(6, 2, 0x4341ca)

    pixelBuffer.setPixel(6, 3, 0x744eca)
    pixelBuffer.setPixel(6, 4, 0x744eca)
    pixelBuffer.setPixel(5, 4, 0x744eca)

    pixelBuffer.setPixel(2, 0, 0xFFFFFF)
    pixelBuffer.setPixel(4, 0, 0xFFFFFF)
    pixelBuffer.setPixel(1, 1, 0xFFFFFF)
    pixelBuffer.setPixel(3, 1, 0xFFFFFF)
    pixelBuffer.setPixel(5, 1, 0xFFFFFF)
    pixelBuffer.setPixel(1, 2, 0xFFFFFF)
    pixelBuffer.setPixel(2, 2, 0xFFFFFF)
    pixelBuffer.setPixel(3, 2, 0xFFFFFF)
    pixelBuffer.setPixel(4, 2, 0xFFFFFF)
    pixelBuffer.setPixel(5, 2, 0xFFFFFF)
    pixelBuffer.setPixel(1, 3, 0xFFFFFF)
    pixelBuffer.setPixel(2, 3, 0xFFFFFF)
    pixelBuffer.setPixel(4, 3, 0xFFFFFF)
    pixelBuffer.setPixel(5, 3, 0xFFFFFF)
  }
}
