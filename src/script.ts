console.info('WLED UDP Control!')

import App from './lib/App'
import { Config } from './lib/Config'

import MovingPixel from './lib/animations/MovingPixel'

const config = new Config()
const app = new App(config.config)

app.setAnimation(new MovingPixel(config.config.width, config.config.height))

;(async () => {
  await app.run()
})()
