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
    pixelBuffer.setPixel({ x: 0, y: 0, color: 0x754eca })
    pixelBuffer.setPixel({ x: 1, y: 0, color: 0x754eca })
    pixelBuffer.setPixel({ x: 0, y: 1, color: 0x754eca })
    pixelBuffer.setPixel({ x: 0, y: 2, color: 0x754eca })
    pixelBuffer.setPixel({ x: 0, y: 3, color: 0x754eca })
    pixelBuffer.setPixel({ x: 0, y: 4, color: 0x754eca })
    pixelBuffer.setPixel({ x: 1, y: 4, color: 0x754eca })
    pixelBuffer.setPixel({ x: 2, y: 1, color: 0x754eca })

    pixelBuffer.setPixel({ x: 2, y: 4, color: 0x6249ca })
    pixelBuffer.setPixel({ x: 3, y: 0, color: 0x6249ca })
    pixelBuffer.setPixel({ x: 3, y: 3, color: 0x6249ca })
    pixelBuffer.setPixel({ x: 3, y: 4, color: 0x6249ca })
    pixelBuffer.setPixel({ x: 4, y: 1, color: 0x6249ca })
    pixelBuffer.setPixel({ x: 4, y: 4, color: 0x6249ca })

    pixelBuffer.setPixel({ x: 5, y: 0, color: 0x4341ca })
    pixelBuffer.setPixel({ x: 6, y: 0, color: 0x4341ca })
    pixelBuffer.setPixel({ x: 6, y: 1, color: 0x4341ca })
    pixelBuffer.setPixel({ x: 6, y: 2, color: 0x4341ca })

    pixelBuffer.setPixel({ x: 6, y: 3, color: 0x744eca })
    pixelBuffer.setPixel({ x: 6, y: 4, color: 0x744eca })
    pixelBuffer.setPixel({ x: 5, y: 4, color: 0x744eca })

    pixelBuffer.setPixel({ x: 2, y: 0, color: 0xffffff })
    pixelBuffer.setPixel({ x: 4, y: 0, color: 0xffffff })
    pixelBuffer.setPixel({ x: 1, y: 1, color: 0xffffff })
    pixelBuffer.setPixel({ x: 3, y: 1, color: 0xffffff })
    pixelBuffer.setPixel({ x: 5, y: 1, color: 0xffffff })
    pixelBuffer.setPixel({ x: 1, y: 2, color: 0xffffff })
    pixelBuffer.setPixel({ x: 2, y: 2, color: 0xffffff })
    pixelBuffer.setPixel({ x: 3, y: 2, color: 0xffffff })
    pixelBuffer.setPixel({ x: 4, y: 2, color: 0xffffff })
    pixelBuffer.setPixel({ x: 5, y: 2, color: 0xffffff })
    pixelBuffer.setPixel({ x: 1, y: 3, color: 0xffffff })
    pixelBuffer.setPixel({ x: 2, y: 3, color: 0xffffff })
    pixelBuffer.setPixel({ x: 4, y: 3, color: 0xffffff })
    pixelBuffer.setPixel({ x: 5, y: 3, color: 0xffffff })
  }
}
