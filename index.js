import { createWriteStream } from 'fs'
import gifenc from 'gifenc'
import sharp from 'sharp'

class Gif {
  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  constructor(width, height) {
    this._width = width
    this._height = height
    this._frames = []
  }

  async addImage(path) {
    // Read and process the image with sharp
    const imageBuffer = await sharp(path)
      .resize(this.width, this.height)
      .png()
      .toBuffer()

    // Store the processed frame
    this._frames.push(imageBuffer)
    return true
  }

  async addBuffer(data) {
    // Process base64 buffer with sharp
    const imageBuffer = await sharp(Buffer.from(data, 'base64'))
      .resize(this.width, this.height)
      .png()
      .toBuffer()

    // Store the processed frame
    this._frames.push(imageBuffer)
    return true
  }

  async addImages(paths) {
    const promises = paths.map(async (path) => {
      await this.addImage(path)
    })
    return Promise.all(promises)
  }

  async save(path) {
    if (this._frames.length === 0) {
      throw new Error('No frames to save')
    }

    // Create GIF encoder
    const gif = new gifenc.GIFEncoder(this.width, this.height)
    
    // Set up the GIF properties
    gif.setRepeat(0); // Infinite loop
    gif.setDelay(1000); // 1 second delay between frames
    gif.setQuality(10); // Lower is better quality

    // Write to file or return buffer
    if (path) {
      const writeStream = createWriteStream(path)
      
      // Start encoding
      gif.createReadStream().pipe(writeStream)

      // Add frames to GIF
      for (const frame of this._frames) {
        gif.addFrame(frame)
      }
      
      gif.finish()

      // Return a promise that resolves when the file is written
      return new Promise((resolve, reject) => {
        writeStream.on('finish', () => resolve())
        writeStream.on('error', reject)
      })
    } else {
      // Return buffer
      const chunks = []
      
      // Add frames to GIF
      for (const frame of this._frames) {
        gif.addFrame(frame)
      }
      
      gif.finish()

      // Create a readable stream and collect data
      const stream = gif.createReadStream()
      return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('end', () => resolve(Buffer.concat(chunks)))
        stream.on('error', reject)
      })
    }
  }
}

export default Gif
