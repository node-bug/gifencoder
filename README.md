# GifEncoder

add images to a gif and return buffer, save to file

## Overview

This is a Node.js module for creating GIF animations by combining multiple images. It provides a simple API to add images to a GIF and save the result either to a file or return it as a buffer.

## Installation

```bash
npm install @nodebug/gifencoder
```

## Usage

```javascript
// For CommonJS
const Gif = require('@nodebug/gifencoder')

// For ES Modules
import Gif from '@nodebug/gifencoder'

// Create a new GIF with 320x240 dimensions
const gif = new Gif(320, 240)

// Add images to the GIF
await gif.addImage('image1.png')
await gif.addImage('image2.png')

// Save to file or get buffer
await gif.save('output.gif') // Saves to file
// or
const buffer = await gif.save() // Returns buffer
```

## API Reference

### Main Class: `Gif`

#### Constructor

```javascript
new Gif(width, height)
```

Creates a new GIF encoder with specified dimensions.

**Parameters:**

- `width` (number): Width of the GIF canvas
- `height` (number): Height of the GIF canvas

**Properties:**

- `width`: Getter for the GIF width
- `height`: Getter for the GIF height
- `encoder`: Getter for the underlying GIFEncoder instance
- `canvas`: Getter for a canvas with the specified dimensions

#### Methods

##### `addImage(path)`

Adds an image from a file path to the GIF.

**Parameters:**

- `path` (string): File path to the image

**Returns:**

- Promise that resolves when the image is added

##### `addBuffer(data)`

Adds an image from a base64 encoded buffer to the GIF.

**Parameters:**

- `data` (string): Base64 encoded image data

**Returns:**

- Promise that resolves when the image is added

##### `addImages(paths)`

Adds multiple images from file paths to the GIF.

**Parameters:**

- `paths` (array): Array of file paths to images

**Returns:**

- Promise that resolves when all images are added

##### `save(path)`

Finalizes the GIF and saves it to a file or returns it as a buffer.

**Parameters:**

- `path` (string, optional): File path to save the GIF. If not provided, returns buffer.

**Returns:**

- Promise that resolves with the buffer data (if no path provided) or resolves when file is written

## Configuration

The GIF encoder is configured with:

- Repeat: 0 (infinite loop)
- Delay: 1000ms between frames
- Quality: 10 (lower is better quality)

## Dependencies

This project uses:

- `gifencoder`: For GIF encoding functionality
- `canvas`: For image processing capabilities

## Development

This project uses ESLint for code quality and Prettier for code formatting. The configuration includes:

- Airbnb base ESLint rules
- Prettier integration
- Line length limit of 120 characters
- Unix line endings

## License

This project is licensed under the MPL-2.0 license.
