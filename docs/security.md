# Security Notes

## Static Only

TipFrame is static and does not collect, store, or upload visitor data by itself.

## URL Overrides

For public deployments, you can disable URL-based text/payment/profile overrides:

```js
security: {
	allowUrlOverrides: false
}
```

When disabled, URL parameters such as `title`, `desc`, `methods`, and `profile` are ignored. Display-only parameters such as `theme`, `style`, `type`, `size`, `layout`, `motion`, and `noindex` still work.

## Locked Profile

```js
security: {
	lockedProfile: 'projectA'
}
```

This forces a profile and ignores `?profile=`.

## noindex

Use either config:

```js
seo: {
	robots: 'noindex'
}
```

Or URL:

```text
?noindex=1
```

## URL Text Safety

Supported URL text parameters are written with `textContent`, not `innerHTML`.
