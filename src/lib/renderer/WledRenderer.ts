import AbstractRenderer from './AbstractRenderer'


export default class WledRenderer extends AbstractRenderer {
  constructor(params: { 
    host: string,
    port: number,
    width: number, 
    height: number, 
    brightness: number 
  }) {
    super(params)
    console.info('WledRenderer init')
    throw new Error('Not implemented')
  }

  init() {
    // Do Nothing
  }

  deinit() {
    // Do Nothing
  }

  render(pixelData: number[]) {
  }
}
