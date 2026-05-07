# Configuration

TipFrame reads `window.TipFrameConfig` from `config.js` before running `donate.js`.

## Basic Structure

```js
window.TipFrameConfig = {
	page: {},
	modal: {},
	theme: {},
	display: {},
	security: {},
	seo: {},
	payments: {},
	profiles: {}
};
```

## Theme

```js
theme: {
	accent: '#1677ff'
}
```

`theme.accent` controls the focus/accent color.

## Display

```js
display: {
	mode: 'auto',
	style: 'glass',
	layout: 'horizontal',
	size: 'md',
	motion: true,
	methods: ['paypal', 'alipay', 'wechat']
}
```

`layout` supports `horizontal` and `vertical`.

`style` supports `glass`, `minimal`, and `mono`.

Vertical layout is useful for narrow sidebars:

```text
index.html?layout=vertical&type=card
```

## Payment Icons

```js
payments: {
	wechat: {
		icon: './images/custom-wechat.svg',
		color: '#0aa45a'
	}
}
```

`icon` overrides the button icon. `color` overrides the brand color.

## Profiles

```js
profiles: {
	projectA: {
		page: {
			title: '支持 Project A'
		},
		display: {
			methods: ['wechat', 'alipay']
		}
	}
}
```

Use `?profile=projectA` to apply a profile, unless `security.lockedProfile` is configured.
