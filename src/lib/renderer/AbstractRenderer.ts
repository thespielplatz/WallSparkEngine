export default class AbstractRenderer {
  protected width: number
  protected height: number
  protected brightness: number

  constructor(params :{ width: number, height: number, brightness: number }) {
    this.width = params.width
    this.height = params.height
    this.brightness = params.brightness
  }

  init() {
    console.warn('This is just a stub, implement in actual class.')
  }

  deinit() {
    console.warn('This is just a stub, implement in actual class.')
  }

  render(pixelData: number[]) {
    console.warn('This is just a stub, implement in actual class.', pixelData)
  }
}
