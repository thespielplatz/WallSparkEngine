/* eslint-disable no-unused-vars */
import GameObject from '@tsp/wse/GameObjects/GameObject'
import PixelBuffer from '@tsp/wse/GameEngine/drawing/PixelBuffer'

let colors = [0xFFFFFF, 0x101010, 0xFF8800, 0x909090, 0x050505]

type Pixel = {
  x: number
  y: number
  color: number
}

enum State {
  Start,
  Drop,
  Move,
  Done,
}

export default class BlockFound extends GameObject {
  private accumulatedTime = 0
  private step = 0
  private width
  private height
  private pixels: Pixel[] = []
  private size
  private speed
  private state: State = State.Start
  private finishedCallback?: () => void

  constructor({ x, y, width, height, size = 5, finishedCallback, speed = 1.0 }: { x: number, y: number, width: number, height: number, size?: number, finishedCallback?: () => void, speed?: number }) {
    super({ x, y })
    this.width = width
    this.height = height
    this.size = size
    this.speed = speed
    this.finishedCallback = finishedCallback

    this.initBlocks()
  }

  private initBlocks() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.pixels.push({ x: i % this.size, y: -1, color: this.getRandomColor() })
    }
  }

  async update() {
    this.accumulatedTime += this.speed
    if (this.accumulatedTime >= 1) {
      this.nextStep()
      this.accumulatedTime = 0
    }
  }

  async draw(pixelBuffer: PixelBuffer) {
    if (this.step < 0) { return }

    for (let i = 0; i < this.pixels.length; i++) {
      const p = this.pixels[i]
      if (p.x < 0 || p.x >= this.width || p.y < 0 || p.y >= this.height) { continue }
      pixelBuffer.setPixel(p)
    }
  }

  private nextStep() {
    if (this.state == State.Done) { return }
    if (this.step < 0) { return }

    if (this.state == State.Start) { this.nextStepStart() }
    if (this.state == State.Drop) { this.nextStepDrop() }
    if (this.state == State.Move) { this.nextStepMove() }

    if (this.step < 0) { return }

    this.step++
  }

  private nextStepStart() {
    if (this.step < 10) { return }
    this.state = State.Drop
    this.step = 0
  }

  private nextStepDrop() {
    if (this.step < 25) { this.pixels[Math.floor(this.step / 5)].y++; return }
    if (this.step < 45) { this.pixels[this.size + Math.floor((this.step - 25) / 4)].y++; return }
    if (this.step < 60) { this.pixels[2 * this.size + Math.floor((this.step - 45) / 3)].y++; return }
    if (this.step < 70) { this.pixels[3 * this.size + Math.floor((this.step - 60) / 2)].y++; return }
    if (this.step < 75) { this.pixels[4 * this.size + Math.floor((this.step - 70) / 1)].y++; return }
    this.state = State.Move
    this.step = 0
  }

  private nextStepMove() {
    for (let i = 0; i < this.pixels.length; i++) {
      this.pixels[i].x++
    }

    if (this.step > this.width) {
      this.step = -1
      this.state = State.Done
      if (this.finishedCallback) {
        this.finishedCallback()
      }
    }
  }

  private getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }
}
