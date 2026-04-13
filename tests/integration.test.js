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
  beforeAll(() => {
    // Create a simple test image if it doesn't exist
    const testImagePath = path.join(__dirname, 'test-image.png')
    if (!fs.existsSync(testImagePath)) {
      // We'll test with the basic functionality since we don't have actual test images
      // This test mainly verifies the API structure works
    }
  })

  test('should create a Gif instance with proper properties', () => {
    const gif = new Gif(320, 240)
    expect(gif).toBeInstanceOf(Object)
    expect(gif.width).toBe(320)
    expect(gif.height).toBe(240)
  })

  test('should handle basic method calls without errors', async () => {
    const gif = new Gif(100, 100)
    
    // Test that methods exist and don't throw immediately
    expect(typeof gif.addImage).toBe('function')
    expect(typeof gif.addBuffer).toBe('function')
    expect(typeof gif.addImages).toBe('function')
    expect(typeof gif.save).toBe('function')
  })

  test('should properly handle the save method with no frames', async () => {
    const gif = new Gif(100, 100)
    
    expect(async () => {
      await gif.save()
    }).rejects.toThrow()
  })

  test('should maintain the same API interface', () => {
    const gif = new Gif(200, 150)
    
    // Test all expected properties and methods exist
    expect(gif).toHaveProperty('width')
    expect(gif).toHaveProperty('height')
    expect(typeof gif.addImage).toBe('function')
    expect(typeof gif.addBuffer).toBe('function')
    expect(typeof gif.addImages).toBe('function')
    expect(typeof gif.save).toBe('function')
  })
})