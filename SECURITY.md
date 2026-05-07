# Security Policy

## Data Collection

TipFrame is a static frontend-only widget. It does not include a backend service and does not actively collect, store, or upload visitor data.

Payment links such as PayPal open third-party platforms. Those platforms may process access or payment data according to their own privacy policies. If QR images are hosted on a CDN, object storage, or another third-party service, that service may keep request logs.

## URL Parameter Safety

Supported URL parameters are handled through an allowlist. Text values are written with `textContent` and are not executed as HTML or JavaScript.

Do not extend the project by writing user-controlled URL values into `innerHTML` unless you add explicit sanitization.

## Payment QR Codes

Do not commit real personal payment QR codes to a public repository unless you intentionally want them to be public.

When sharing a public demo, prefer placeholder QR codes or clearly documented test images.

## Reporting a Security Issue

If you find a security issue, please open a private report through the repository hosting platform if available. If private reporting is not available, contact the maintainer directly before publishing details.

Please include:

- A short description of the issue.
- Steps to reproduce.
- Affected files or URLs.
- Any suggested mitigation.
