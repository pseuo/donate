window.TipFrameConfig = {
	page: {
		documentTitle: 'TipFrame',
		eyebrow: 'TipFrame',
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
		mode: 'auto',
		style: 'glass',
		layout: 'horizontal',
		size: 'md',
		motion: true,
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
			href: 'https://www.paypal.me/7fffan',
			label: 'PayPal',
			ariaLabel: 'PayPal 捐赠 / PayPal donate',
			icon: './images/paypal-xiao.png',
			color: '#0070ba'
		},
		alipay: {
			enabled: true,
			kind: 'qr',
			qr: './images/alipay-qr.jpg',
			title: 'Alipay',
			label: 'Alipay',
			ariaLabel: '支付宝 / Alipay 二维码',
			icon: './images/alipay-xiao.png',
			color: '#1677ff'
		},
		wechat: {
			enabled: true,
			kind: 'qr',
			qr: './images/wechat-qr.jpg',
			title: 'WeChat Pay',
			label: 'WeChat',
			ariaLabel: '微信支付 / WeChat Pay 二维码',
			icon: './images/wechat-xiao.png',
			color: '#0aa45a'
		}
	},
	profiles: {
		projectA: {
			page: {
				documentTitle: '支持 Project A',
				title: '支持 Project A',
				description: '感谢你支持 Project A 的持续维护。'
			},
			display: {
				methods: ['wechat', 'alipay']
			},
			payments: {
				alipay: {
					qr: './images/alipay-qr.jpg'
				},
				wechat: {
					qr: './images/wechat-qr.jpg'
				}
			}
		},
		projectB: {
			page: {
				documentTitle: 'Support Project B',
				title: 'Support Project B',
				description: 'Thanks for supporting Project B.'
			},
			display: {
				methods: ['paypal', 'wechat'],
				style: 'minimal'
			},
			payments: {
				paypal: {
					href: 'https://www.paypal.me/7fffan'
				},
				wechat: {
					qr: './images/wechat-qr.jpg'
				}
			}
		},
		brokenQr: {
			page: {
				documentTitle: '二维码错误演示',
				title: '二维码错误演示',
				description: '这个 profile 用于测试二维码图片路径错误时的禁用状态。'
			},
			display: {
				methods: ['wechat']
			},
			payments: {
				wechat: {
					qr: './images/missing-qr.jpg'
				}
			}
		},
		lockedDemo: {
			page: {
				documentTitle: 'URL 覆盖禁用演示',
				title: 'URL 覆盖禁用演示',
				description: '这个 profile 用于演示 allowUrlOverrides=false 时 URL 文案和支付方式不会覆盖配置。'
			},
			display: {
				methods: ['wechat'],
				layout: 'vertical'
			},
			security: {
				allowUrlOverrides: false,
				lockedProfile: 'lockedDemo'
			}
		}
	}
};
