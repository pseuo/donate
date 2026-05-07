# Deployment

TipFrame can be deployed to any static hosting service.

## Required Files

- `index.html`
- `config.js`
- `donate.css`
- `donate.js`
- `embed.js`
- `images/`

## GitHub Pages

1. Upload the project to a GitHub repository.
2. Open repository `Settings`.
3. Open `Pages`.
4. Select `Deploy from a branch`.
5. Select `main` and `/root`.
6. Save and wait for deployment.
7. Open the generated GitHub Pages URL.

## CSP

Recommended baseline:

```http
Content-Security-Policy: default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline';
```

If QR images are hosted on a CDN, add that origin to `img-src`.
