# URL Parameters

TipFrame accepts a small allowlist of URL parameters. Text parameters are written with `textContent`; they are not executed as HTML.

| Parameter | Default | Example | Overrides config | Description |
| --- | --- | --- | --- | --- |
| `theme` | Saved preference or system preference | `?theme=dark` | Yes | Sets `light` or `dark` theme. |
| `methods` | `config.display.methods` | `?methods=wechat,paypal` | Yes | Shows selected payment methods in the given order. |
| `compact` | Derived from embed state | `?compact=1` | Yes | Enables compact mode and hides page copy. |
| `embed` | Auto-detected iframe state | `?embed=1` | Yes | Forces iframe/embed behavior. |
| `type` | `auto` or `compact` in iframe | `?type=card` | Yes | Supports `compact`, `full`, and `card`. |
| `style` | `config.display.style` | `?style=mono` | Yes | Supports `glass`, `minimal`, and `mono`. |
| `layout` | `config.display.layout` | `?layout=vertical` | Yes | Supports `horizontal` and `vertical`. |
| `size` | `config.display.size` | `?size=sm` | Yes | Supports `sm`, `md`, and `lg`. |
| `lang` | Browser language | `?lang=en` | Yes | Supports `zh-CN` and `en`. |
| `motion` | `config.display.motion` | `?motion=0` | Yes | Disables animations when set to `0`, `false`, or `off`. |
| `open` | Empty | `?open=wechat` | N/A | Opens a QR payment modal on load. Supports QR methods such as `alipay` and `wechat`. |
| `profile` | Empty | `?profile=projectA` | Yes | Applies a profile from `config.profiles`. |
| `noindex` | `config.seo.robots` | `?noindex=1` | Yes | Sets robots meta to `noindex`. |
| `title` | `config.page.title` | `?title=支持这个项目` | Yes | Overrides the page title text. |
| `desc` | `config.page.description` | `?desc=感谢支持` | Yes | Overrides description text. |
| `description` | `config.page.description` | `?description=Thanks` | Yes | Alias of `desc`. |
| `eyebrow` | `config.page.eyebrow` | `?eyebrow=Sponsor` | Yes | Overrides small label above the title. |
| `hint` | Device-specific hint | `?hint=扫码后完成支付` | Yes | Overrides QR modal hint. |
| `caption` | `config.modal.caption` | `?caption=点击空白处关闭` | Yes | Overrides QR modal bottom caption. |
| `modalEyebrow` | `config.modal.eyebrow` | `?modalEyebrow=扫码` | Yes | Overrides QR modal eyebrow text. |
| `modal-eyebrow` | `config.modal.eyebrow` | `?modal-eyebrow=Scan` | Yes | Kebab-case alias of `modalEyebrow`. |
| `documentTitle` | `config.page.documentTitle` | `?documentTitle=Donate` | Yes | Overrides browser tab title. |
| `document-title` | `config.page.documentTitle` | `?document-title=Donate` | Yes | Kebab-case alias of `documentTitle`. |
| `image` | `config.page.shareImage` | `?image=./images/like.svg` | Yes | Overrides Open Graph / Twitter share image. |

## Config-Only Options

These options are configured in `config.js` and are not currently exposed through URL parameters.

| Config path | Example | Description |
| --- | --- | --- |
| `theme.accent` | `'#1677ff'` | Sets the global accent/focus color. |
| `security.allowUrlOverrides` | `false` | Prevents URL parameters from overriding text, methods, and profile. |
| `security.lockedProfile` | `'projectA'` | Forces one profile and ignores `?profile=`. |
| `seo.robots` | `'noindex'` | Sets the robots meta value. |
| `payments.paypal.icon` | `'./images/paypal-xiao.png'` | Overrides the payment button icon. |
| `payments.paypal.color` | `'#0070ba'` | Overrides the payment button brand color. |
| `payments.wechat.enabled` | `false` | Enables or disables a payment method. |
| `profiles.projectA` | `{ page, display, payments }` | Defines a reusable project/recipient profile. |

## Examples

Dark minimal WeChat-only embed:

```text
index.html?embed=1&type=compact&theme=dark&style=minimal&methods=wechat
```

Mono card:

```text
index.html?style=mono&type=card
```

Vertical card layout:

```text
index.html?layout=vertical&type=card
```

Open WeChat QR on load:

```text
index.html?open=wechat
```

Use a profile and card mode:

```text
index.html?profile=projectA&type=card
```
