# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added comprehensive test suite with mocha
- Added temporary image generation and GIF creation tests
- Added more detailed documentation

### Changed

- Fixed gifenc library API usage in save method
- Improved error handling in all methods
- Updated package.json with correct test script path

## [1.2.1] - 2026-04-13

### Changed

- Fixed gifenc library API usage (was using gifStream instead of GIFEncoder)
- Corrected package.json duplicate engines field
- Fixed test script path from "tests/**/\*.js" to "test/**/\*.test.js"
- Updated documentation to reflect correct API usage

## [1.2.0] - 2026-04-13

### Added

- Complete rewrite with modern Node.js standards
- Support for Node.js 24+
- ES module support
- Improved image processing with sharp
- GIF encoding with gifenc
- Buffer and file output support
- Comprehensive test suite

### Changed

- Refactored code to use ES modules
- Updated dependencies to latest versions
- Improved documentation
- Enhanced error handling

### Fixed

- Various bug fixes in GIF creation
- Improved API consistency

## [1.0.0] - 2023-01-15

### Added

- Initial release of @nodebug/gifencoder
- Basic GIF creation functionality
- Support for adding images to GIFs
- File and buffer output support
