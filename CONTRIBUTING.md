# Contributing

Thanks for helping improve TipFrame.

## Local Preview

Use any static server from the project root.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

You can also use Node:

```bash
npx serve .
```

## Check Scripts

Before submitting changes, run syntax checks:

```bash
node --check donate.js
node --check embed.js
node --check config.js
```

Also check example configs if you touched them:

```bash
node --check config.example.js
node --check config.zh-CN.example.js
node --check config.en.example.js
```

## Change Configuration

User-facing configuration belongs in `config.js` or one of the example config files.

Common areas:

- `page`: document title, heading, description, share image.
- `modal`: QR modal text and error messages.
- `theme`: accent color.
- `display`: mode, style, layout, size, method order.
- `security`: URL override and profile lock behavior.
- `seo`: robots behavior.
- `payments`: payment links, QR images, labels, icons, colors.
- `profiles`: reusable project/recipient profiles.

Avoid hard-coding user-specific payment details in `donate.js`.

## Add a URL Parameter

When adding a new URL parameter:

1. Add parsing logic in `donate.js`.
2. Add it to the allowlist in `embed.js` if it should work with `data-*` embedding.
3. Document it in `docs/parameters.md`.
4. Add a manual test case to `TESTING.md`.
5. Prefer writing text with `textContent`, not `innerHTML`.

If the parameter can affect payment links, QR paths, or visible text, consider whether it should respect `security.allowUrlOverrides`.

## Add an Example

Put standalone examples in `examples/`.

Use relative paths like `../index.html` and `../embed.js` so examples work locally and after static deployment.

## Style Guidelines

- Keep the project dependency-free.
- Prefer small, focused changes.
- Keep static hosting compatibility.
- Keep public configuration in `config.js`.
- Do not commit real personal QR codes unless they are intentionally public.
