export default class AbstractRenderer {
  protected width: number
  protected height: number
  protected brightness: number

  constructor(params :{ width: number, height: number, brightness: number }) {
    this.width = params.width
    this.height = params.height
    this.brightness = params.brightness
  }

  // eslint-disable-next-line no-unused-vars
  async render(pixelData: number[]) {
    new Error('This is just a stub, implement in actual class.')
  }
}
