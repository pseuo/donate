window.TipFrameConfig = {
	page: {
		documentTitle: 'TipFrame',
		eyebrow: 'TipFrame',
		title: '如果这个项目帮到了你',
		description: '可以用你习惯的方式支持一下维护。',
		shareImage: './images/like.svg'
	},
	theme: {
		accent: '#1677ff'
	},
	display: {
		style: 'glass',
		layout: 'horizontal',
		size: 'md',
		methods: ['paypal', 'alipay', 'wechat']
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
			enabled: true,
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
