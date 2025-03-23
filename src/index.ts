
import * as TheGameEngine from './GameEngine/GameEngine'
import * as PixelBuffer from './GameEngine/drawing/PixelBuffer'
import * as Config from './GameEngine/Config'

const GameEngine = {
  GameEngine: TheGameEngine,
  Config,
  PixelBuffer,
}


import * as GameObject from './GameObjects/GameObject'

import * as Blinker from './GameObjects/Animations/Blinker'
import * as Countdown from './GameObjects/Animations/Countdown'
import * as MovingPixel from './GameObjects/Animations/MovingPixel'
import * as Rainbow from './GameObjects/Animations/Rainbow'
import * Time from './GameObjects/Animations/Time'

const Animations = {
  Blinker,
  Countdown,
  MovingPixel,
  Rainbow,
  Time,
}

import * as Fill from './GameObjects/Drawing/Fill'
import * as Text from './GameObjects/Drawing/Text'

const Drawing = {
  Fill,
  Text,
}

import * as GameEngineController from './GameObjects/Logic/GameEngineController'

const Logic = {
  GameEngineController,
}

export {
  GameEngine,
  GameObject,
  Drawing,
  Animations,
  Logic,
}
