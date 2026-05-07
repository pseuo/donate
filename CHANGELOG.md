# Changelog

All notable changes to TipFrame are documented in this file.

## Unreleased

- Added external `config.js` support so user configuration can be kept separate from `donate.js`.
- Added URL parameters for theme, methods, compact/full/card mode, title text, language, motion, size, style, and Open Graph image.
- Added `?open=wechat` style default QR opening.
- Added `?profile=projectA` style multi-recipient/profile configuration.
- Added dark mode, minimal style, card mode, button sizes, and motion disabling.
- Added `style=mono` black-and-white minimal style.
- Added iframe auto-resize via same-origin height updates and `postMessage` fallback.
- Added reusable `embed.js` with multi-instance `[data-tipframe]` support.
- Added an embed-code generator on the standalone page.
- Added QR image precheck so unavailable QR methods are disabled before opening.
- Added Open Graph / Twitter metadata and favicon support.
- Added privacy, security, CSP, sandbox, testing, and GitHub Pages documentation.

## 1.0.0

- Initial static donation widget based on `donate-page`.
- Supports PayPal, Alipay QR code, and WeChat Pay QR code.
- Includes responsive layout, QR modal, and iframe-friendly rendering.
