# Embed Guide

## iframe

```html
<iframe
	src="https://example.com/?embed=1&type=compact"
	style="overflow:hidden; border:0; min-height:90px; width:100%;"
	sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
	frameborder="0"
	scrolling="no">
</iframe>
```

Listen for resize messages in the parent page:

```js
window.addEventListener('message', function (event) {
	if (!event.data || event.data.type !== 'tipframe:resize') return;

	var iframe = document.querySelector('iframe');
	if (iframe) {
		iframe.style.height = event.data.height + 'px';
	}
});
```

## embed.js

```html
<div data-tipframe data-methods="wechat" data-type="card"></div>
<script src="https://example.com/embed.js"></script>
```

Multiple `[data-tipframe]` containers are supported.
