window.TipFrameConfig = {
	page: {
		documentTitle: '支持这个项目',
		eyebrow: '赞助支持',
		title: '如果这个项目帮到了你',
		description: '可以用你习惯的方式支持一下维护。',
		shareImage: './images/like.svg'
	},
	modal: {
		eyebrow: '扫码支持',
		hintMobile: '长按可保存二维码',
		hintDesktop: '右键可保存二维码',
		caption: '点击空白处或按 Esc 键关闭',
		error: '图片加载失败，请检查二维码路径',
		unavailable: '不可用'
	},
	theme: {
		accent: '#1677ff'
	},
	display: {
		style: 'glass',
		layout: 'horizontal',
		size: 'md',
		methods: ['wechat', 'alipay', 'paypal']
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
			ariaLabel: 'PayPal 捐赠',
			icon: './images/paypal-xiao.png',
			color: '#0070ba'
		},
		alipay: {
			enabled: true,
			kind: 'qr',
			qr: './images/alipay-qr.jpg',
			title: '支付宝',
			label: '支付宝',
			ariaLabel: '支付宝收款二维码',
			icon: './images/alipay-xiao.png',
			color: '#1677ff'
		},
		wechat: {
			enabled: true,
			kind: 'qr',
			qr: './images/wechat-qr.jpg',
			title: '微信支付',
			label: '微信',
			ariaLabel: '微信支付收款二维码',
			icon: './images/wechat-xiao.png',
			color: '#0aa45a'
		}
	}
};
