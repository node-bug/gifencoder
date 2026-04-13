import { createWriteStream } from 'fs'
import gifenc from 'gifenc'
import sharp from 'sharp'

/**
 * GIF encoder class for creating animated GIFs from images
 */
class Gif {
  /**
   * @param {number} width - The width of the GIF
   * @param {number} height - The height of the GIF
   */
  constructor(width, height) {
    this._width = width
    this._height = height
    this._frames = []
  }

  /**
   * @returns {number} The width of the GIF
   */
  get width() {
    return this._width
  }

  /**
   * @returns {number} The height of the GIF
   */
  get height() {
    return this._height
  }

  /**
   * Add an image from a file path to the GIF
   * @param {string} path - Path to the image file
   * @returns {Promise<boolean>} Promise that resolves to true when complete
   */
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

  /**
   * Add an image from a base64 buffer to the GIF
   * @param {string} data - Base64 encoded image data
   * @returns {Promise<boolean>} Promise that resolves to true when complete
   */
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

  /**
   * Add multiple images from file paths to the GIF
   * @param {string[]} paths - Array of image file paths
   * @returns {Promise<PromiseSettledResult<boolean>[]>} Promise that resolves to array of results
   */
  async addImages(paths) {
    const promises = paths.map(async (path) => {
      await this.addImage(path)
    })
    return Promise.all(promises)
  }

  /**
   * Save the GIF to a file or return as buffer
   * @param {string} [path] - Optional file path to save to. If not provided, returns buffer
   * @returns {Promise<Buffer|void>} Promise that resolves to buffer when no path provided, or void when path provided
   */
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
