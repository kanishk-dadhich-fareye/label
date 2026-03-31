# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2026-03-31

### Added
- **ZPL Preview Feature**: Added comprehensive ZPL label preview functionality
  - New API endpoint: `POST /app/rest/label_generation/preview/labelTemplate/{id}`
  - Supports PNG image generation for ZPL templates
  - Integrated with custom ZPL viewer for accurate rendering
  - Added DpmmEnum for discrete density values (6, 8, 12, 24 DPMM)
  - DPI conversion utilities for ZPL compatibility

- **Rate Limiting**: Implemented sliding window rate limiting
  - Maximum 60 requests per minute per client
  - In-memory ConcurrentHashMap-based implementation
  - Thread-safe and efficient for high-throughput scenarios

- **Custom ZPL Viewer Integration**:
  - Replaced external Labelary API with local custom-zpl-viewer service
  - Added custom-zpl-viewer as a git submodule
  - Improved reliability and customization control
  - API endpoint: `POST localhost:3000/api/render`

- **Enhanced Exception Handling**:
  - `RateLimitExceededException` (HTTP 429)
  - `InvalidPreviewDimensionException` for dimension validation
  - `TemplateNotFoundException` for missing templates
  - `LabelaryApiException` (now used for custom viewer errors)
  - Global exception handler with proper HTTP status codes

- **ZPL Validation Improvements**:
  - Enhanced validation to require `^FD` commands in ZPL templates
  - Prevents "no labels generated" errors
  - Better error messages for invalid ZPL

- **WebClient Configuration**:
  - Added `WebClientConfig` for reactive HTTP client setup
  - Optimized for API calls to custom ZPL viewer

- **Dependencies**:
  - Added `spring-boot-starter-webflux` for reactive WebClient
  - Lombok for boilerplate reduction

### Changed
- **ZplPreviewService**: Completely refactored to use custom ZPL viewer API
  - Removed Labelary API integration
  - Added rate limiting logic
  - Improved error handling and validation
  - Base64 image decoding for PNG responses

- **LabelTemplateController**: Added preview endpoint
  - New method `previewLabelTemplate()` returning PNG images
  - Proper content-type headers for image responses

- **Project Structure**:
  - Added custom-zpl-viewer as git submodule
  - Updated .gitignore to exclude node_modules and build artifacts
  - Created .gitignore for custom-zpl-viewer submodule

### Technical Details
- **Rate Limiting Algorithm**: Sliding window with 1-minute windows
- **API Integration**: POST requests with JSON payload containing ZPL, density, width, height
- **Image Format**: PNG with Base64 encoding from custom viewer
- **Validation**: Comprehensive ZPL syntax checking before rendering
- **Performance**: Reactive WebClient for non-blocking API calls

### Breaking Changes
- ZPL preview now requires custom-zpl-viewer service running on port 3000
- External Labelary API dependency removed

### Migration Guide
1. Start custom-zpl-viewer service: `cd custom-zpl-viewer && npm run dev`
2. Ensure label-engine server runs on port 8090
3. Use new preview endpoint for ZPL template previews
4. Rate limiting is automatically applied (60 req/min max)