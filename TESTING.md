# Manual Testing Checklist

Run the page with a local static server first:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/` and test the following URLs.

## Display Parameters

- `/?theme=dark`
- `/?style=minimal`
- `/?style=mono&type=card`
- `/?type=card`
- `/?size=sm`
- `/?lang=en`
- `/?motion=0`
- `/?methods=wechat`
- `/?layout=vertical&type=card`
- `/?theme=dark&style=minimal&type=card&size=sm&methods=wechat`

## Embed Parameters

- `/?embed=1&type=compact`
- `/?embed=1&type=full`
- `/?embed=1&type=card&style=minimal`

## Default Open

- `/?open=wechat`
- `/?open=alipay`
- `/?methods=wechat&open=wechat`

Expected result: the matching QR modal opens automatically when the QR image is available.

## Profiles

- `/?profile=projectA`
- `/?profile=projectB&methods=wechat`
- `/?profile=projectA&open=wechat`

Expected result: the selected profile overrides page text and payment settings from `config.js`.

## QR Error State

Temporarily change one QR path in `config.js` to a missing image, for example:

```js
qr: './images/missing-qr.jpg'
```

Expected result: the corresponding payment button becomes disabled and displays `不可用` before the modal opens.

## Embed Script

Open `examples/embed.html`.

Open `examples/broken-qr.html`.

Open `examples/vertical.html`.

Open `examples/url-lock.html`.

Expected result:

- Default instance renders.
- WeChat-only instance renders.
- Card instance renders.
- Minimal instance renders.
- Each iframe auto-resizes without scrollbars.
