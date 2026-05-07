window.TipFrameConfig = {
	page: {
		documentTitle: 'Support this project',
		eyebrow: 'Sponsor',
		title: 'If this project helped you',
		description: 'You can support ongoing maintenance in your preferred way.',
		shareImage: './images/like.svg'
	},
	modal: {
		eyebrow: 'Scan to support',
		hintMobile: 'Long press to save the QR code',
		hintDesktop: 'Right click to save the QR code',
		caption: 'Click outside or press Esc to close',
		error: 'Image failed to load. Check the QR code path.',
		unavailable: 'Unavailable'
	},
	theme: {
		accent: '#1677ff'
	},
	display: {
		style: 'minimal',
		layout: 'horizontal',
		size: 'md',
		methods: ['paypal', 'wechat']
	},
	security: {
		allowUrlOverrides: true,
		lockedProfile: ''
	},
	seo: {
		robots: 'index,follow'
	},
	payments: {
		paypal: {
			enabled: true,
			kind: 'link',
			href: 'https://www.paypal.me/your-name',
			label: 'PayPal',
			ariaLabel: 'PayPal donate',
			icon: './images/paypal-xiao.png',
			color: '#0070ba'
		},
		alipay: {
			enabled: false,
			kind: 'qr',
			qr: './images/alipay-qr.jpg',
			title: 'Alipay',
			label: 'Alipay',
			ariaLabel: 'Alipay QR code',
			icon: './images/alipay-xiao.png',
			color: '#1677ff'
		},
		wechat: {
			enabled: true,
			kind: 'qr',
			qr: './images/wechat-qr.jpg',
			title: 'WeChat Pay',
			label: 'WeChat',
			ariaLabel: 'WeChat Pay QR code',
			icon: './images/wechat-xiao.png',
			color: '#0aa45a'
		}
	}
};
