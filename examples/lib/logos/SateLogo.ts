import PixelBuffer from '@/GameEngine/drawing/PixelBuffer'
import GameObject from '@/GameEngine/gameObjects/GameObject'

export class SateLogo extends GameObject {
  public static width = 3
  public static height = 5

  async draw(pixelBuffer: PixelBuffer) {
      pixelBuffer.setPixel(0, 0, 0xfc0052)
      pixelBuffer.setPixel(1, 0, 0xff0736)
      pixelBuffer.setPixel(2, 0, 0xff330a)
    
      pixelBuffer.setPixel(0, 1, 0xe5027f)
    
      pixelBuffer.setPixel(0, 2, 0xe70078)
      pixelBuffer.setPixel(1, 2, 0xeb0070)
      pixelBuffer.setPixel(2, 2, 0xf4005b)
    
      pixelBuffer.setPixel(2, 3, 0xf60057)
    
      pixelBuffer.setPixel(0, 4, 0xbd198a)
      pixelBuffer.setPixel(1, 4, 0xcf0b82)
      pixelBuffer.setPixel(2, 4, 0xde027b)
  }
}