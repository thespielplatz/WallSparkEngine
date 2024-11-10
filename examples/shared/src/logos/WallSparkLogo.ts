import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'
import GameObject from '@tsp/wse/GameObjects/GameObject'

import ILogo from '@shared/logos/ILogo'

export default class WallSparkLogo extends GameObject implements ILogo {
  get width(): number {
    return 5
  }

  get height(): number {
    return 5
  }

  async draw(pixelBuffer: PixelBuffer) {
    pixelBuffer.setPixelRow({
      y: 0,
      colors: [0x90f0eb, 0x8ef0d3, 0xf7eb52, 0xd46c22, 0xca343b],
    })
    pixelBuffer.setPixelRow({
      y: 1,
      colors: [0x30e4d7, 0xfaaf2e, 0xf9a219, 0xfe8729, 0xd3288d],
    })
    pixelBuffer.setPixelRow({
      y: 2,
      colors: [0x3f5876, 0xffc024, 0xfbfff7, 0xfcb731, 0xff5b25],
    })
    pixelBuffer.setPixelRow({
      y: 3,
      colors: [0x3bc8f4, 0xa85224, 0xfa9019, 0xff4824, 0x7b5be5],
    })
    pixelBuffer.setPixelRow({
      y: 4,
      colors: [0x32bdfe, 0x30affa, 0xf04a15, 0x319bf9, 0x4267ec],
    })
  }
}
