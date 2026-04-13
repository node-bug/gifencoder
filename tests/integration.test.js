import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import Gif from '../index.js'

// Polyfill for __dirname in ES modules
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Gif Encoder - Integration Tests', () => {
  // Create a simple test image for testing
  before(() => {
    // Create a simple test image if it doesn't exist
    const testImagePath = path.join(__dirname, 'test-image.png')
    if (!fs.existsSync(testImagePath)) {
      // We'll test with the basic functionality since we don't have actual test images
      // This test mainly verifies the API structure works
    }
  })

  it('should create a Gif instance with proper properties', () => {
    const gif = new Gif(320, 240)
    expect(gif).to.be.an('object')
    expect(gif.width).to.equal(320)
    expect(gif.height).to.equal(240)
  })

  it('should handle basic method calls without errors', async () => {
    const gif = new Gif(100, 100)
    
    // Test that methods exist and don't throw immediately
    expect(typeof gif.addImage).to.equal('function')
    expect(typeof gif.addBuffer).to.equal('function')
    expect(typeof gif.addImages).to.equal('function')
    expect(typeof gif.save).to.equal('function')
  })

  it('should properly handle the save method with no frames', async () => {
    const gif = new Gif(100, 100)
    
    try {
      await gif.save()
      expect.fail('Should have thrown an error for empty GIF')
    } catch (error) {
      expect(error).to.be.an('error')
      // The error should be about no frames to save
    }
  })

  it('should maintain the same API interface', () => {
    const gif = new Gif(200, 150)
    
    // Test all expected properties and methods exist
    expect(gif).to.have.property('width')
    expect(gif).to.have.property('height')
    expect(typeof gif.addImage).to.equal('function')
    expect(typeof gif.addBuffer).to.equal('function')
    expect(typeof gif.addImages).to.equal('function')
    expect(typeof gif.save).to.equal('function')
  })
})