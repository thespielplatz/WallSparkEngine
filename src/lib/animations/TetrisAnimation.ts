export default class TetrisAnimation {
  pixels: number[]
  width: number
  height: number
  activeBlock: { shape: number[], position: { x: number, y: number } }
  speed: number
  interval: number

  constructor(width: number, height: number, speed: number) {
    this.width = width
    this.height = height
    this.pixels = new Array(width * height).fill(0)
    this.speed = speed
    this.interval = 0
    this.activeBlock = { shape: [], position: { x: 0, y: 0 } }
  }

  // Spawn a new block at the top
  spawnBlock(): void {
  }

  // Render the current frame
  render(): void {
      // Clear the current pixels
      this.pixels.fill(0)

      // Draw active block
      this.drawBlock(this.activeBlock)

      // Update block position
      this.interval++
      if (this.interval >= this.speed) {
          this.activeBlock.position.y++
          this.interval = 0
      }

      // Check for collision with the bottom or other blocks
      if (this.checkCollision()) {
          this.placeBlock()
          this.clearFullRows()
          this.spawnBlock()
      }
  }

  // Draw the active block on the pixels
  drawBlock(block: { shape: number[], position: { x: number, y: number } }): void {
    const size = Math.sqrt(block.shape.length)
    for (let i = 0; i < block.shape.length; i++) {
        const x = i % size + block.position.x
        const y = Math.floor(i / size) + block.position.y
        if (block.shape[i] && this.isWithinBounds(x, y)) {
            this.pixels[y * this.width + x] = 0xFFFFFF
        }
    }
  }

  // Check if a block is within bounds of the display
  isWithinBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }

  // Check if the active block has collided with the bottom or existing blocks
  checkCollision(): boolean {
      const size = Math.sqrt(this.activeBlock.shape.length)
      for (let i = 0; i < this.activeBlock.shape.length; i++) {
          const x = i % size + this.activeBlock.position.x
          const y = Math.floor(i / size) + this.activeBlock.position.y
          if (this.activeBlock.shape[i] && (y >= this.height || this.pixels[y * this.width + x] !== 0)) {
              return true
          }
      }
      return false
  }

  // Place the block on the display
  placeBlock(): void {
    const size = Math.sqrt(this.activeBlock.shape.length)
    for (let i = 0; i < this.activeBlock.shape.length; i++) {
      const x = i % size + this.activeBlock.position.x
      const y = Math.floor(i / size) + this.activeBlock.position.y - 1
      if (this.activeBlock.shape[i] && this.isWithinBounds(x, y)) {
          this.pixels[y * this.width + x] = 0xFFFFFF
      }
    }
  }

  // Clear full rows
  clearFullRows(): void {
  for (let y = 0; y < this.height; y++) {
    let isFullRow = true
      for (let x = 0; x < this.width; x++) {
        if (this.pixels[y * this.width + x] === 0) {
            isFullRow = false
            break
        }
      }

      if (isFullRow) {
        this.clearRow(y)
      }
    }
  }

  // Clear a specific row and shift everything down
  clearRow(row: number): void {
    for (let y = row; y > 0; y--) {
        for (let x = 0; x < this.width; x++) {
            this.pixels[y * this.width + x] = this.pixels[(y - 1) * this.width + x]
        }
    }

    // Clear the top row
    for (let x = 0; x < this.width; x++) {
        this.pixels[x] = 0
    }
  }

  // Call this function to update and get the next frame
  nextFrame() {
    this.render()
  }
}
