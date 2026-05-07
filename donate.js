document.addEventListener('DOMContentLoaded', function () {
	var body = document.body;
	var isEmbedded = false;
	var searchParams = new URLSearchParams(window.location.search);
	var themeToggle = document.querySelector('.theme-toggle');
	var pageEyebrow = document.querySelector('.page-copy__eyebrow');
	var pageTitle = document.querySelector('.page-copy h1');
	var pageDescription = document.querySelector('.page-copy p:last-child');
	var generator = document.querySelector('.embed-builder');
	var generatorToggle = document.querySelector('.embed-builder-toggle');
	var generatorOutput = document.querySelector('.embed-builder__output');
	var generatorCopy = document.querySelector('.embed-builder__copy');
	var overlay = document.querySelector('.qr-modal');
	var card = document.querySelector('.qr-modal__card');
	var image = document.querySelector('.qr-modal__image');
	var status = document.querySelector('.qr-modal__status');
	var title = document.getElementById('qr-title');
	var hint = document.getElementById('qr-hint');
	var caption = document.getElementById('qr-caption');
	var closeButton = document.querySelector('.qr-modal__close');
	var methodButtons = document.querySelectorAll('[data-method]');
	var lastTrigger = null;
	var closeTimer = null;
	var resizeObserver = null;
	var qrCache = {};
	var themeStorageKey = 'tipframe-theme';
	var donationConfig = {
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
		themeLabels: {
			light: '深色模式',
			dark: '浅色模式'
		},
		payments: {
			paypal: {
				enabled: true,
				kind: 'link',
				href: 'https://www.paypal.me/7fffan',
				label: 'PayPal',
				ariaLabel: 'PayPal 捐赠 / PayPal donate',
				iconLabel: 'PayPal',
				icon: './images/paypal-xiao.png'
			},
			alipay: {
				enabled: true,
				kind: 'qr',
				qr: './images/alipay-qr.jpg',
				title: 'Alipay',
				label: 'Alipay',
				ariaLabel: '支付宝 / Alipay 二维码',
				iconLabel: 'Alipay',
				icon: './images/alipay-xiao.png'
			},
			wechat: {
				enabled: true,
				kind: 'qr',
				qr: './images/wechat-qr.jpg',
				title: 'WeChat Pay',
				label: 'WeChat',
				ariaLabel: '微信支付 / WeChat Pay 二维码',
				iconLabel: 'WeChat',
				icon: './images/wechat-xiao.png'
			}
		}
	};
	var languageText = {
		'zh-CN': {
			page: donationConfig.page,
			modal: donationConfig.modal,
			themeLabels: donationConfig.themeLabels,
			labels: {
				copy: '复制代码',
				copied: '已复制',
				unavailable: '不可用'
			}
		},
		en: {
			page: {
				documentTitle: 'TipFrame',
				eyebrow: 'TipFrame',
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
			themeLabels: {
				light: 'Dark mode',
				dark: 'Light mode'
			},
			labels: {
				copy: 'Copy code',
				copied: 'Copied',
				unavailable: 'Unavailable'
			}
		}
	};
	var activeMethods = donationConfig.display.methods.slice();
	var activeLang = 'zh-CN';

	function isPlainObject(value) {
		return Object.prototype.toString.call(value) === '[object Object]';
	}

	function mergeConfig(target, source) {
		if (!isPlainObject(source)) return target;

		Object.keys(source).forEach(function (key) {
			if (isPlainObject(source[key]) && isPlainObject(target[key])) {
				mergeConfig(target[key], source[key]);
			} else {
				target[key] = source[key];
			}
		});

		return target;
	}

	mergeConfig(donationConfig, window.TipFrameConfig);
	if (getActiveProfile() && donationConfig.profiles && donationConfig.profiles[getActiveProfile()]) {
		mergeConfig(donationConfig, donationConfig.profiles[getActiveProfile()]);
	}
	mergeConfig(languageText['zh-CN'].page, donationConfig.page);
	mergeConfig(languageText['zh-CN'].modal, donationConfig.modal);
	mergeConfig(languageText['zh-CN'].themeLabels, donationConfig.themeLabels);

	try {
		isEmbedded = window.self !== window.top;
	} catch (error) {
		isEmbedded = true;
	}

	if (searchParams.get('embed') === '1' || searchParams.get('embed') === 'true') {
		isEmbedded = true;
	}

	if (isEmbedded) {
		body.classList.add('is-embedded');
	}

	if (!overlay || !card || !image || !title || !closeButton || !methodButtons.length) return;

	function getParam(name) {
		var value = searchParams.get(name);
		return value === null ? '' : value.trim();
	}

	function getCanonicalUrl() {
		return window.location.href.split('?')[0].split('#')[0];
	}

	function isUrlOverrideAllowed() {
		return !donationConfig.security || donationConfig.security.allowUrlOverrides !== false;
	}

	function getOverrideParam(name) {
		return isUrlOverrideAllowed() ? getParam(name) : '';
	}

	function getActiveProfile() {
		if (donationConfig.security && donationConfig.security.lockedProfile) {
			return donationConfig.security.lockedProfile;
		}

		return isUrlOverrideAllowed() ? getParam('profile') : '';
	}

	function hexToRgb(hex) {
		var normalized = (hex || '').trim().replace(/^#/, '');
		var value;

		if (/^[0-9a-f]{3}$/i.test(normalized)) {
			normalized = normalized.split('').map(function (char) {
				return char + char;
			}).join('');
		}

		if (!/^[0-9a-f]{6}$/i.test(normalized)) return '';

		value = parseInt(normalized, 16);
		return ((value >> 16) & 255) + ', ' + ((value >> 8) & 255) + ', ' + (value & 255);
	}

	function getMode() {
		var type = getParam('type').toLowerCase();
		var compact = getParam('compact').toLowerCase();

		if (compact === '1' || compact === 'true' || type === 'compact') return 'compact';
		if (type === 'card') return 'card';
		if (type === 'full') return 'full';
		return isEmbedded ? 'compact' : donationConfig.display.mode;
	}

	function getStyleName() {
		var style = getParam('style').toLowerCase() || donationConfig.display.style;
		return ['glass', 'minimal', 'mono'].indexOf(style) === -1 ? 'glass' : style;
	}

	function getSizeName() {
		var size = getParam('size').toLowerCase() || donationConfig.display.size;
		return ['sm', 'md', 'lg'].indexOf(size) === -1 ? 'md' : size;
	}

	function getLayoutName() {
		var layout = getParam('layout').toLowerCase() || donationConfig.display.layout;
		return layout === 'vertical' ? 'vertical' : 'horizontal';
	}

	function getMotionEnabled() {
		var motion = getParam('motion').toLowerCase();
		if (motion === '0' || motion === 'false' || motion === 'off') return false;
		return donationConfig.display.motion !== false;
	}

	function getLanguage() {
		var lang = getParam('lang');
		var browserLang = (navigator.language || '').toLowerCase();

		if (lang === 'en' || lang === 'zh-CN') return lang;
		return browserLang.indexOf('zh') === 0 ? 'zh-CN' : 'en';
	}

	function getOpenMethod() {
		var method = getParam('open').toLowerCase();

		if (!method || activeMethods.indexOf(method) === -1) return '';
		if (!donationConfig.payments[method] || donationConfig.payments[method].kind !== 'qr') return '';

		return method;
	}

	function parseMethods() {
		var methods = getOverrideParam('methods');
		var allowed = donationConfig.display.methods.filter(function (method) {
			return donationConfig.payments[method] && donationConfig.payments[method].enabled !== false;
		});

		if (!methods) return allowed.slice();

		methods = methods.split(',').map(function (method) {
			return method.trim().toLowerCase();
		}).filter(function (method) {
			return allowed.indexOf(method) !== -1;
		});

		return methods.length ? methods : allowed.slice();
	}

	function getConfiguredText(name, fallback) {
		return getOverrideParam(name) || getOverrideParam(name.replace(/[A-Z]/g, function (letter) {
			return '-' + letter.toLowerCase();
		})) || fallback;
	}

	function shouldNoindex() {
		var noindex = getParam('noindex').toLowerCase();
		var robots = donationConfig.seo && donationConfig.seo.robots;

		return noindex === '1' || noindex === 'true' || robots === 'noindex';
	}

	function applyMethodOrder() {
		var paymentGrid = document.querySelector('.payment-grid');

		if (!paymentGrid) return;

		activeMethods.forEach(function (method) {
			var button = paymentGrid.querySelector('[data-method="' + method + '"]');
			if (button) {
				paymentGrid.appendChild(button);
			}
		});
	}

	function applyCopy() {
		var modalEyebrow = document.querySelector('.qr-modal__eyebrow');
		var langConfig = languageText[activeLang] || languageText['zh-CN'];
		var documentTitle = getConfiguredText('documentTitle', donationConfig.page.documentTitle);
		var eyebrowText = getConfiguredText('eyebrow', langConfig.page.eyebrow);
		var titleText = getConfiguredText('title', langConfig.page.title);
		var descriptionText = getConfiguredText('desc', getConfiguredText('description', langConfig.page.description));
		var defaultHint = window.matchMedia && window.matchMedia('(pointer: coarse)').matches ? langConfig.modal.hintMobile : langConfig.modal.hintDesktop;
		var hintText = getConfiguredText('hint', defaultHint);
		var captionText = getConfiguredText('caption', langConfig.modal.caption);
		var modalEyebrowText = getConfiguredText('modalEyebrow', langConfig.modal.eyebrow);
		var shareImage = getConfiguredText('image', donationConfig.page.shareImage);
		var canonicalUrl = getCanonicalUrl();

		document.title = documentTitle;
		document.documentElement.lang = activeLang;
		if (pageEyebrow) pageEyebrow.textContent = eyebrowText;
		if (pageTitle) pageTitle.textContent = titleText;
		if (pageDescription) pageDescription.textContent = descriptionText;
		if (hint) hint.textContent = hintText;
		if (caption) caption.textContent = captionText;
		if (modalEyebrow) modalEyebrow.textContent = modalEyebrowText;
		if (generatorCopy) generatorCopy.textContent = langConfig.labels.copy;
		setMeta('description', descriptionText);
		setMeta('property', 'og:title', titleText);
		setMeta('property', 'og:description', descriptionText);
		setMeta('property', 'og:image', shareImage);
		setMeta('name', 'twitter:title', titleText);
		setMeta('name', 'twitter:description', descriptionText);
		setMeta('name', 'twitter:image', shareImage);
		setMeta('property', 'og:url', canonicalUrl);
		setMeta('name', 'robots', shouldNoindex() ? 'noindex' : (donationConfig.seo && donationConfig.seo.robots) || 'index,follow');
		setCanonical(canonicalUrl);
	}

	function setMeta(attr, key, content) {
		if (attr === 'description') {
			content = key;
		}

		var selector = attr === 'property' ? 'meta[property="' + key + '"]' : 'meta[name="' + key + '"]';
		var meta = attr === 'description' ? document.querySelector('meta[name="description"]') : document.querySelector(selector);

		if (!meta) return;

		meta.setAttribute('content', content || '');
	}

	function setCanonical(href) {
		var link = document.querySelector('link[rel="canonical"]');

		if (!link) return;

		link.setAttribute('href', href || '');
	}

	function applyDisplayMode() {
		var mode = getMode();
		var styleName = getStyleName();
		var sizeName = getSizeName();
		var layoutName = getLayoutName();
		var accentRgb = hexToRgb(donationConfig.theme && donationConfig.theme.accent);

		if (accentRgb) {
			document.documentElement.style.setProperty('--focus-rgb', accentRgb);
			document.documentElement.style.setProperty('--accent-rgb', accentRgb);
		}

		body.classList.toggle('is-compact', mode === 'compact');
		body.classList.toggle('is-full', mode === 'full');
		body.classList.toggle('is-card', mode === 'card');
		body.classList.toggle('is-minimal', styleName === 'minimal');
		body.classList.toggle('is-mono', styleName === 'mono');
		body.classList.toggle('layout-vertical', layoutName === 'vertical');
		body.classList.toggle('has-motion-off', !getMotionEnabled());
		body.classList.remove('size-sm', 'size-md', 'size-lg');
		body.classList.add('size-' + sizeName);
	}

	function getPreferredTheme() {
		var theme = getParam('theme').toLowerCase();
		if (theme === 'dark' || theme === 'light') return theme;

		try {
			return localStorage.getItem(themeStorageKey) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		} catch (error) {
			return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
	}

	function applyTheme(theme) {
		var nextTheme = theme === 'dark' ? 'dark' : 'light';
		var themeLabel = themeToggle ? themeToggle.querySelector('.theme-toggle__label') : null;
		var langConfig = languageText[activeLang] || languageText['zh-CN'];

		document.documentElement.dataset.theme = nextTheme;
		if (themeToggle) {
			themeToggle.setAttribute('aria-pressed', nextTheme === 'dark' ? 'true' : 'false');
			if (themeLabel) {
				themeLabel.textContent = langConfig.themeLabels[nextTheme];
			}
		}

		if (!getParam('theme')) {
			try {
				localStorage.setItem(themeStorageKey, nextTheme);
			} catch (error) {
			}
		}
	}

	function getContentHeight() {
		var rootHeight = Math.ceil(document.documentElement.scrollHeight);
		var bodyHeight = Math.ceil(body.scrollHeight);
		return Math.max(rootHeight, bodyHeight);
	}

	function getModalHeight() {
		if (!overlay.classList.contains('is-open')) return 0;

		var cardRect = card.getBoundingClientRect();
		return Math.ceil(cardRect.height + 48);
	}

	function syncEmbeddedHeight() {
		if (!isEmbedded) return;

		var height = Math.max(getContentHeight(), getModalHeight());
		if (!height) return;

		try {
			if (window.frameElement && window.frameElement.tagName === 'IFRAME') {
				window.frameElement.style.height = height + 'px';
			} else {
				window.parent.postMessage({ type: 'tipframe:resize', height: height }, '*');
			}
		} catch (error) {
			try {
				window.parent.postMessage({ type: 'tipframe:resize', height: height }, '*');
			} catch (postMessageError) {
			}
		}
	}

	function scheduleHeightSync() {
		window.requestAnimationFrame(syncEmbeddedHeight);
	}

	function setStatus(message) {
		if (!status) return;

		status.textContent = message || '';
		overlay.classList.toggle('has-status', Boolean(message));
	}

	function setErrorState(message) {
		overlay.classList.add('is-error');
		setStatus(message || donationConfig.modal.error);
	}

	function markQrUnavailable(button) {
		var langConfig = languageText[activeLang] || languageText['zh-CN'];
		var unavailableText = langConfig.modal.unavailable;

		if (!button) return;

		button.classList.add('is-unavailable');
		button.disabled = true;
		button.setAttribute('aria-disabled', 'true');
		button.setAttribute('title', unavailableText);
		if (button.querySelector('.payment-label')) {
			button.querySelector('.payment-label').textContent += ' · ' + unavailableText;
		}
	}

	function precheckQr(button, src) {
		if (!src) {
			markQrUnavailable(button);
			return;
		}

		var checkImage = new Image();
		checkImage.onload = function () {
			preloadQr(src);
		};
		checkImage.onerror = function () {
			markQrUnavailable(button);
			scheduleHeightSync();
		};
		checkImage.src = src;
	}

	function buildEmbedCode() {
		var baseUrl = window.location.href.split('?')[0];
		var scriptUrl = new URL('./embed.js', baseUrl).toString();
		var selectedTheme = generator.querySelector('[name="embed-theme"]').value;
		var selectedType = generator.querySelector('[name="embed-type"]').value;
		var selectedSize = generator.querySelector('[name="embed-size"]').value;
		var selectedStyle = generator.querySelector('[name="embed-style"]').value;
		var selectedMethods = Array.prototype.slice.call(generator.querySelectorAll('[name="embed-methods"]:checked')).map(function (input) {
			return input.value;
		}).join(',');
		var generatedUrl = new URL(baseUrl);

		generatedUrl.searchParams.set('embed', '1');
		generatedUrl.searchParams.set('type', selectedType);
		generatedUrl.searchParams.set('theme', selectedTheme);
		generatedUrl.searchParams.set('size', selectedSize);
		generatedUrl.searchParams.set('style', selectedStyle);
		if (selectedMethods) generatedUrl.searchParams.set('methods', selectedMethods);

		return '<div data-tipframe data-src="' + baseUrl + '" data-type="' + selectedType + '" data-theme="' + selectedTheme + '" data-size="' + selectedSize + '" data-style="' + selectedStyle + '" data-methods="' + selectedMethods + '"></div>\n<script src="' + scriptUrl + '"><\/script>';
	}

	function updateEmbedCode() {
		if (!generator || !generatorOutput) return;

		generatorOutput.value = buildEmbedCode();
	}

	function setupEmbedBuilder() {
		if (!generator) return;

		if (generatorToggle) {
			generatorToggle.addEventListener('click', function () {
				var willOpen = generator.hidden;

				generator.hidden = !willOpen;
				generatorToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
				generatorToggle.textContent = willOpen ? '隐藏嵌入代码' : '生成嵌入代码';
				if (willOpen) {
					updateEmbedCode();
				}
				scheduleHeightSync();
			});
		}

		generator.addEventListener('change', updateEmbedCode);
		if (generatorCopy) {
			generatorCopy.addEventListener('click', function () {
				var langConfig = languageText[activeLang] || languageText['zh-CN'];
				generatorOutput.select();
				if (navigator.clipboard && navigator.clipboard.writeText) {
					navigator.clipboard.writeText(generatorOutput.value);
				} else {
					document.execCommand('copy');
				}
				generatorCopy.textContent = langConfig.labels.copied;
				window.setTimeout(function () {
					generatorCopy.textContent = langConfig.labels.copy;
				}, 1200);
			});
		}
		updateEmbedCode();
	}

	function openDefaultMethod() {
		var method = getOpenMethod();
		var button;

		if (!method) return;

		button = document.querySelector('[data-method="' + method + '"]');
		if (!button || button.hidden || button.disabled) return;

		window.setTimeout(function () {
			if (button.disabled) return;
			openQr(button.getAttribute('data-qr'), button.getAttribute('data-title'), button);
		}, 420);
	}

	function preloadQr(src) {
		if (!src || qrCache[src]) return;

		qrCache[src] = new Image();
		qrCache[src].src = src;
	}

	function openQr(src, label, trigger) {
		if (!src) return;
		window.clearTimeout(closeTimer);
		lastTrigger = trigger || null;
		image.alt = (label || '支付') + '二维码';
		title.textContent = label || '二维码';
		card.style.transition = '';
		card.style.transform = '';
		overlay.classList.remove('is-closing');
		overlay.classList.remove('is-error');
		overlay.classList.add('is-loading');
		overlay.classList.add('is-open');
		overlay.setAttribute('aria-hidden', 'false');
		setStatus('');
		preloadQr(src);
		image.removeAttribute('src');
		image.src = src;
		if (image.complete || (qrCache[src] && qrCache[src].complete)) {
			overlay.classList.remove('is-loading');
		}
		body.style.overflow = 'hidden';
		closeButton.focus();
		scheduleHeightSync();
	}

	function triggerPressFeedback(button) {
		if (!button) return;

		button.classList.remove('is-pressing');
		void button.offsetWidth;
		button.classList.add('is-pressing');
		window.setTimeout(function () {
			button.classList.remove('is-pressing');
		}, 520);

		if (navigator.vibrate) {
			navigator.vibrate(12);
		}
	}

	function closeQr() {
		if (!overlay.classList.contains('is-open')) return;

		window.clearTimeout(closeTimer);
		overlay.classList.remove('is-loading');
		overlay.classList.remove('is-error');
		overlay.classList.add('is-closing');
		overlay.classList.remove('is-open');
		overlay.setAttribute('aria-hidden', 'true');
		card.style.transition = '';
		card.style.transform = '';
		closeTimer = window.setTimeout(function () {
			overlay.classList.remove('is-closing');
			body.style.overflow = '';

			if (lastTrigger && typeof lastTrigger.focus === 'function') {
				lastTrigger.focus();
			}
			scheduleHeightSync();
		}, 220);
	}

	activeLang = getLanguage();
	activeMethods = parseMethods();
	applyCopy();
	applyDisplayMode();
	applyMethodOrder();
	applyTheme(getPreferredTheme());
	setupEmbedBuilder();

	if (themeToggle) {
		themeToggle.addEventListener('click', function () {
			applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
		});
	}

	methodButtons.forEach(function (button) {
		var method = button.getAttribute('data-method');
		var config = donationConfig.payments[method];
		var brandRgb;

		if (!config || activeMethods.indexOf(method) === -1) {
			button.hidden = true;
			button.setAttribute('aria-hidden', 'true');
			return;
		}

		button.hidden = false;
		button.removeAttribute('aria-hidden');

		button.setAttribute('aria-label', config.ariaLabel);
		if (config.icon) {
			button.style.setProperty('--payment-icon', 'url("' + config.icon.replace(/"/g, '%22') + '")');
		}
		if (config.color) {
			brandRgb = hexToRgb(config.color);
			if (brandRgb) {
				button.style.setProperty('--brand-rgb', brandRgb);
				button.style.color = config.color;
			}
		}
		if (button.querySelector('.payment-label')) {
			button.querySelector('.payment-label').textContent = config.label;
		}

		if (config.kind === 'link') {
			button.setAttribute('href', config.href);
		} else {
			button.setAttribute('data-qr', config.qr);
			button.setAttribute('data-title', config.title);
			precheckQr(button, config.qr);
		}
	});

	methodButtons.forEach(function (button) {
		var method = button.getAttribute('data-method');
		var config = donationConfig.payments[method];

		if (!config || config.kind !== 'qr') return;

		button.addEventListener('click', function () {
			triggerPressFeedback(button);
			openQr(button.getAttribute('data-qr'), button.getAttribute('data-title'), button);
		});
	});

	methodButtons.forEach(function (button) {
		var method = button.getAttribute('data-method');
		var config = donationConfig.payments[method];

		if (!config || config.kind !== 'link') return;

		button.addEventListener('click', function () {
			triggerPressFeedback(button);
			scheduleHeightSync();
		});
	});

	if (window.ResizeObserver) {
		resizeObserver = new ResizeObserver(function () {
			scheduleHeightSync();
		});
		resizeObserver.observe(document.body);
		resizeObserver.observe(card);
	}

	window.addEventListener('resize', scheduleHeightSync);
	window.addEventListener('load', scheduleHeightSync);
	window.addEventListener('load', openDefaultMethod);
	window.addEventListener('message', function (event) {
		if (!event || !event.data || event.data.type !== 'tipframe:request-resize') return;
		scheduleHeightSync();
	});

	overlay.addEventListener('click', function (event) {
		if (event.target === overlay || event.target.classList.contains('qr-modal__backdrop')) {
			closeQr();
		}
	});

	closeButton.addEventListener('click', closeQr);
	image.addEventListener('load', function () {
		overlay.classList.remove('is-loading');
		overlay.classList.remove('is-error');
		setStatus('');
		scheduleHeightSync();
	});
	image.addEventListener('error', function () {
		overlay.classList.remove('is-loading');
		setErrorState(donationConfig.modal.error);
		scheduleHeightSync();
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
			closeQr();
		}
	});

	scheduleHeightSync();
});
