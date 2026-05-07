# TipFrame

一个轻量的静态打赏/赞助组件，支持 PayPal、支付宝和微信支付，可直接部署或通过 `iframe` 嵌入到网站


## 功能特点

- 支持 PayPal 跳转、支付宝二维码、微信二维码。
- 纯静态实现，不依赖后端服务和构建工具。
- 支持 `iframe` 嵌入，适合放到文章页、侧边栏或项目文档中。
- 二维码弹窗支持点击空白处关闭、关闭按钮关闭和 `Esc` 键关闭。
- 响应式布局，兼容桌面端和移动端。
- 支持浅色/深色主题切换，并跟随系统配色偏好。
- 二维码图片加载失败时会显示提示，不会直接留白。
- 在同源 iframe 中会自动同步高度，也提供 `postMessage` 兼容方案。
- 保留 `sample/` 示例，便于对比原始样式或二次改造。

## 目录结构

```text
.
├── index.html              # 默认打赏页，适合直接部署或 iframe 嵌入
├── donate.css              # 默认页面样式和弹窗样式
├── config.js               # 外部配置文件，升级 donate.js 时优先保留这里
├── config.example.js        # 通用配置示例
├── config.zh-CN.example.js  # 中文配置示例
├── config.en.example.js     # 英文配置示例
├── donate.js               # 默认页面二维码弹窗交互
├── embed.js                # 组件化 iframe 嵌入脚本
├── docs/                    # 配置、嵌入、安全、部署文档
├── examples/                # iframe / embed.js 示例页面
├── images/                 # 默认页面图标和收款二维码
└── sample/                 # 原始风格示例页面
```

## 快速使用

1. 下载或克隆本项目。
2. 替换 `images/alipay-qr.jpg` 和 `images/wechat-qr.jpg` 为你自己的收款二维码。
3. 修改 `config.js` 中的收款配置和页面文案。
4. 将整个目录上传到任意静态托管服务。
5. 直接访问 `index.html`，或使用 `iframe` 嵌入到其他页面。

## 修改收款信息

### PayPal

在 `config.js` 的 `window.TipFrameConfig.payments.paypal.href` 中修改 PayPal 链接：

```js
paypal: {
  kind: 'link',
  href: 'https://www.paypal.me/your-name'
}
```

图标对应的资源文件是 `images/paypal-xiao.png`、`images/alipay-xiao.png`、`images/wechat-xiao.png`。

### 支付宝和微信

默认二维码路径在 `config.js` 的 `window.TipFrameConfig.payments` 中配置：

```js
alipay: {
  kind: 'qr',
  qr: './images/alipay-qr.jpg'
},
wechat: {
  kind: 'qr',
  qr: './images/wechat-qr.jpg'
}
```

你可以直接替换同名图片，也可以修改配置里的 `qr` 指向新的图片路径。

### 页面文案

页面标题、说明文案和二维码弹窗提示集中在 `config.js`：

```js
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
}
```

二维码会在页面加载后提前检测。如果图片不可访问，对应按钮会自动变成不可用状态，避免用户打开弹窗后才看到空白。

### 品牌色和图标

可以在 `config.js` 里设置全局品牌色和单个支付方式图标：

```js
theme: {
  accent: '#1677ff'
},
payments: {
  wechat: {
    icon: './images/custom-wechat.svg',
    color: '#0aa45a'
  }
}
```

`theme.accent` 会影响焦点色和整体强调色。`payments.xxx.icon` 会覆盖按钮图标，`payments.xxx.color` 会覆盖按钮品牌色。

## URL 参数

可以通过 URL 参数临时控制展示，不需要修改源码：

```text
index.html?theme=dark&methods=paypal,wechat&compact=1&title=支持这个项目
```

支持的参数：

- `theme=light|dark`：指定浅色或深色主题。
- `methods=paypal,alipay,wechat`：指定显示哪些支付方式，并按传入顺序展示。
- `compact=1`：启用紧凑模式，隐藏标题和说明。
- `embed=1`：强制使用嵌入模式。
- `type=compact|full`：嵌入时选择紧凑模式或完整模式。
- `type=card`：卡片模式，适合侧边栏。
- `style=glass|minimal|mono`：玻璃拟态、极简或黑白极简样式。
- `layout=horizontal|vertical`：横向或纵向排列支付按钮。
- `size=sm|md|lg`：控制按钮尺寸。
- `lang=zh-CN|en`：指定中文或英文；不传时根据浏览器语言自动选择。
- `motion=0`：关闭动画。
- `open=wechat`：页面加载后默认打开某个二维码支付方式，支持 `alipay` 或 `wechat`。
- `profile=projectA`：使用 `config.js` 中的某个收款人/项目配置。
- `noindex=1`：设置 robots 为 `noindex`。
- `title=支持这个项目`：覆盖页面主标题。
- `desc=谢谢你的支持` 或 `description=谢谢你的支持`：覆盖说明文案。
- `eyebrow=Sponsor`：覆盖标题上方的小字。
- `hint=扫码后完成支付`：覆盖二维码提示。
- `caption=点击空白处关闭`：覆盖弹窗底部说明。
- `documentTitle=Donate` 或 `document-title=Donate`：覆盖浏览器标题。
- `image=./images/like.svg`：覆盖 Open Graph / Twitter 分享图。

示例：

```text
index.html?embed=1&type=full&theme=dark&methods=wechat&title=请我喝杯咖啡&desc=感谢你的支持
```

纵向按钮示例：

```text
index.html?layout=vertical&type=card
```

URL 参数只在白名单内生效，并且所有文案都通过 `textContent` 写入页面，不会作为 HTML 执行。

完整参数表见 [`docs/parameters.md`](./docs/parameters.md)。

详细文档：

- [配置说明](./docs/configuration.md)
- [参数速查](./docs/parameters.md)
- [嵌入说明](./docs/embed.md)
- [安全说明](./docs/security.md)
- [部署说明](./docs/deployment.md)

### 多收款人配置

可以在 `config.js` 中配置多个 profile：

```js
profiles: {
  projectA: {
    page: {
      title: '支持 Project A'
    },
    display: {
      methods: ['wechat', 'alipay']
    },
    payments: {
      wechat: {
        qr: './images/wechat-qr.jpg'
      }
    }
  }
}
```

访问时使用：

```text
index.html?profile=projectA
```

## iframe 嵌入

将下面代码中的 `src` 改成你自己的部署地址：

```html
<iframe
  src="https://example.com/donate/"
  style="overflow:hidden; border:0; min-height:240px; width:100%;"
  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
  frameborder="0"
  scrolling="no">
</iframe>
```

页面被 `iframe` 嵌入时会自动隐藏说明文案，只展示一行紧凑的打赏按钮。可以根据实际页面高度调整 `min-height`。

如果希望嵌入时保留完整标题和说明，可以使用：

```html
<iframe
  src="https://example.com/donate/?embed=1&type=full"
  style="overflow:hidden; border:0; min-height:240px; width:100%;"
  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
  frameborder="0"
  scrolling="no">
</iframe>
```

如果你想让外层页面自动收缩高度，可以在宿主页面监听 `tipframe:resize`：

```js
window.addEventListener('message', function (event) {
  if (!event.data || event.data.type !== 'tipframe:resize') return;

  var iframe = document.querySelector('iframe[src*="donate"]');
  if (iframe) {
    iframe.style.height = event.data.height + 'px';
  }
});
```

## 组件化嵌入

如果不想手写 iframe 和高度监听，可以使用 `embed.js`：

```html
<div data-tipframe></div>
<script src="https://example.com/donate/embed.js"></script>
```

`embed.js` 会自动创建 iframe、追加 `embed=1` 参数，并监听 `tipframe:resize` 自动调整高度。

也可以通过 `data-*` 传参：

```html
<div data-tipframe></div>
<script
  src="https://example.com/donate/embed.js"
  data-theme="dark"
  data-methods="paypal,wechat"
  data-type="compact"
  data-style="minimal"
  data-size="sm"
  data-lang="en"
  data-motion="0"
  data-title="支持这个项目"
  data-desc="感谢你的支持"
  data-document-title="Donate">
</script>
```

也支持多个实例，每个容器可以有自己的配置：

```html
<div data-tipframe data-methods="paypal,wechat"></div>
<div data-tipframe data-methods="wechat" data-type="card"></div>
<script src="https://example.com/donate/embed.js"></script>
```

如果 `embed.js` 和 `index.html` 不在同一目录，可以手动指定页面地址：

```html
<div data-tipframe></div>
<script
  src="https://cdn.example.com/tipframe/embed.js"
  data-src="https://example.com/donate/"
  data-methods="wechat">
</script>
```

更多示例：

- `examples/embed.html`：`embed.js` 多实例示例。
- `examples/iframe.html`：手写 iframe 示例。
- `examples/profiles.html`：`profile` 多收款人示例。
- `examples/security.html`：带 `sandbox` 的安全 iframe 示例。
- `examples/broken-qr.html`：二维码路径错误时按钮禁用示例。
- `examples/vertical.html`：纵向按钮布局示例。
- `examples/url-lock.html`：禁用 URL 覆盖示例。


## GitHub Pages 部署

1. 将项目上传到 GitHub 仓库。
2. 进入仓库 `Settings`。
3. 打开 `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. 选择 `main` 分支和 `/root` 目录。
6. 保存后等待 GitHub Pages 构建完成。
7. 访问 GitHub Pages 给出的地址，例如 `https://your-name.github.io/donate-main/`。
8. 如果使用自定义域名，请在部署平台中确保 HTTPS 已开启。

## 部署方式

可以部署到任意静态托管平台，例如：

- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify
- Nginx/Apache 静态目录
- 对象存储静态网站托管

部署时保持文件目录结构不变，确保 `images/` 中的图片可以被正常访问。

## 自定义样式

- 修改按钮文字：编辑 `index.html` 中的 `payment-label`。
- 修改独立页说明文案：编辑 `config.js` 中的 `page`。
- 修改按钮颜色：编辑 `donate.css` 中的 `payment-button--paypal`、`payment-button--alipay`、`payment-button--wechat`。
- 修改按钮图标：编辑 `donate.css` 中的 `--payment-icon`。
- 修改二维码弹窗文案：编辑 `index.html` 中 `.qr-modal` 相关内容。
- 修改二维码弹窗尺寸：编辑 `donate.css` 中 `.qr-modal__card` 和 `.qr-modal__image`。
- 修改主题色和深色模式：编辑 `donate.css` 顶部的变量和 `html[data-theme='dark']` 区块。


## CSP 建议

如果部署平台允许配置响应头，可以使用下面的基础 Content Security Policy：

```http
Content-Security-Policy: default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline';
```

如果你的二维码图片放在第三方 CDN，需要把对应域名加入 `img-src`。

## 隐私说明

TipFrame 是纯静态页面，不依赖后端服务，不主动收集、存储或上传访问者信息。

需要注意：PayPal 等第三方支付链接会跳转到对应平台，第三方平台可能根据自身隐私政策处理访问和支付数据。二维码图片如果托管在第三方 CDN 或对象存储，图片请求日志也可能由对应服务商记录。

## License

MIT License.
