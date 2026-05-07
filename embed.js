(function () {
	var currentScript = document.currentScript;
	var scriptSrc = currentScript ? currentScript.src : '';
	var optionNames = ['src', 'theme', 'methods', 'compact', 'embed', 'type', 'title', 'desc', 'description', 'eyebrow', 'hint', 'caption', 'documentTitle', 'style', 'size', 'lang', 'motion', 'profile', 'open', 'layout', 'noindex'];

	function getContainers() {
		var containers = Array.prototype.slice.call(document.querySelectorAll('[data-tipframe]'));
		var legacy = document.getElementById('tipframe');

		if (legacy && containers.indexOf(legacy) === -1) {
			containers.unshift(legacy);
		}

		return containers;
	}

	function getBaseUrl() {
		if (!scriptSrc) return './index.html';

		return scriptSrc.replace(/embed\.js(?:\?.*)?$/, 'index.html');
	}

	function toDataName(name) {
		return 'data-' + name.replace(/[A-Z]/g, function (letter) {
			return '-' + letter.toLowerCase();
		});
	}

	function readOptions(source) {
		var options = {};

		if (!source) return options;

		optionNames.forEach(function (name) {
			var value = source.getAttribute(toDataName(name));
			if (value !== null && value !== '') {
				options[name] = value;
			}
		});

		return options;
	}

	function mergeOptions(primary, fallback) {
		var options = {};

		Object.keys(fallback || {}).forEach(function (key) {
			options[key] = fallback[key];
		});
		Object.keys(primary || {}).forEach(function (key) {
			options[key] = primary[key];
		});

		return options;
	}

	function buildSrc(options) {
		var src = options.src || getBaseUrl();
		var url = new URL(src, window.location.href);

		url.searchParams.set('embed', options.embed || '1');
		url.searchParams.set('type', options.type || (options.compact === '0' || options.compact === 'false' ? 'full' : 'compact'));

		Object.keys(options).forEach(function (key) {
			if (key === 'src' || key === 'embed' || key === 'type' || key === 'compact') return;
			url.searchParams.set(key, options[key]);
		});

		if (options.compact !== undefined) {
			url.searchParams.set('compact', options.compact);
		}

		return url.toString();
	}

	function createIframe(container, options) {
		var iframe = document.createElement('iframe');
		var fullLike = options.type === 'full' || options.type === 'card' || options.compact === '0' || options.compact === 'false';

		iframe.src = buildSrc(options);
		iframe.title = options.documentTitle || options.title || 'TipFrame';
		iframe.loading = 'lazy';
		iframe.scrolling = 'no';
		iframe.setAttribute('frameborder', '0');
		iframe.style.width = '100%';
		iframe.style.minHeight = fullLike ? '240px' : '72px';
		iframe.style.border = '0';
		iframe.style.overflow = 'hidden';
		iframe.style.display = 'block';

		container.innerHTML = '';
		container.appendChild(iframe);
		return iframe;
	}

	function mount(container, scriptOptions) {
		var options = mergeOptions(scriptOptions, readOptions(container));
		var iframe = createIframe(container, options);

		window.addEventListener('message', function (event) {
			if (!event.data || event.data.type !== 'tipframe:resize') return;
			if (event.source !== iframe.contentWindow) return;
			if (!event.data.height || event.data.height < 1) return;

			iframe.style.height = Math.ceil(event.data.height) + 'px';
		});
	}

	var containers = getContainers();
	if (!containers.length) return;

	var scriptOptions = readOptions(currentScript);
	containers.forEach(function (container) {
		mount(container, scriptOptions);
	});
}());
