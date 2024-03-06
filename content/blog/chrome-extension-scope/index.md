---
title: "Chrome 扩展程序不同脚本的上下文区别"
date: 2023-08-30T16:00:00+08:00
lang: zh-cn
draft: false
categories:
  - 编程
tags:
  - Chrome
  - 浏览器插件
  - JavaScript
  - CSS
summary: 写过 Chrome 扩展程序的朋友，一定被扩展程序不同脚本文件的 JS 上下文折磨过：*Content script*、*Background script*、popup 中的 script，到底有什么区别？
---

写过 Chrome 扩展程序的朋友，一定被扩展程序不同脚本文件的 JS 上下文折磨过：*Content script*、*Background script*、popup 中的 script，到底有什么区别？Chrome 的官方开发文档本来就没有在一个地方非常系统性的讲解和对比各个上下文的区别，并且（所谓出于安全性考虑）故意 “春秋笔法”，甚至有时候自己都没有统一一个叫法。

在无数次的尝试和在 StackOverflow 的抽丝剥茧之后，我也终于能整理出这么一个详细的总结，详细讲讲不同上下文究竟有何异同。

> 注：本文基于撰写时最新的 [Chrome Extension Manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/) 版本。

## Popup UI 上下文

在官方文档的 [Getting Started](https://developer.chrome.com/docs/extensions/mv3/getstarted/) 中，就用到了作用于 popup 页面（即：点击右上角扩展图标弹出的页面）的 `popup.js`、和用于设置界面的 `option.js`。后者我没有用过，故不会在本文展开，但是我预测和此处即将讲的 `popup.js` 大体相同。

Popup 指的是某些浏览器插件在点击图标的时候所弹出来的额外的操作窗口，是这个插件本身的前端界面。我们需要在 `manifest.json` 中声明项目中的哪些文件是为 popup 页面所用的 HTML 文件，然后在
被这些 HTML 页面（例如我们叫 `popup.html`）引用的脚本，都使用该 popup 页面的上下文。**其 `document` 和 `window` 属性都指向这个独立的 popup 页面。**
例如：`document` 能读写这个小页面的 DOM，`window.location.href` 也能拿到这个小页面的 URL（形如 `chrome-extension://< 扩展 ID>/popup.html`。）**但是注意这个上下文里的 `console` 也是独立的，需要在插件菜单栏上右键该插件的图标，然后选择“检查弹出窗口”，即可检查 popup 的 DOM 和 console。**

权限方面，显然这个上下文不能直接访问任何网页的环境。但是它可以访问 `chrome.*`API（前提是在 `manifest.json` 里面声明了相关权限）。

## Background Script

官方 [Getting Started](https://developer.chrome.com/docs/extensions/mv3/getstarted/) 里面还用到了一个 `background.js`。在 v3 版本中，Background Script 基于 service worker 运作，是一段按需加载、基于事件、拥有独立上下文的脚本。
他们**没有 `document` 和 `window` 变量，拥有独立的 `console`**。它的 `console` 可以在 Chrome 扩展页面的 “检查视图 服务工作进程” 中看到。

{{<figure src="background-script.jpg" alt="Chrome 扩展页面的“检查视图 服务工作进程”" width="350">}}
![](background-script.jpg)

常见的编程范式[^1]是，在 background script 中实现偏计算型的业务逻辑，并且利用 `chrome.*.on*.addListener` 的方式监听有关的事件，决定何时调用什么函数。

## Content Script

除了这几个官方迫不及待给你介绍的脚本上下文之外，还有一个经常被大家提起和用到，官方却藏着掖着的 [Content Script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world)。它的上下文是一个和页面本身有些许重合的隔离环境[^4]：**它和网页本身共享一些全局变量，包括 `document`、`console`，以及 `window` 的部分方法（例如 `window.postMessage`，但是官方好像并没有明确列出所有共享的变量）**；同时它 **能访问部分 `chrome.*`API[^3]。**因此，它们可以用来进行一些页面内容的操纵，例如增删元素，为元素绑定新事件监听等等。如果对页面的修改需要涉及到一些动态计算的数据，那么可以将相关的计算任务转发给 Background Script，然后接受它返回的值再来操纵页面。另外 Content Script 不仅包含 JavaScript 脚本，也可以包含自定义的 CSS 样式代码。

我们几种方式声明 Content Script。在 `manifest.json` 里面可以直接静态声明将某些文件用作 Content Script。类似的基于文件的加载也可以在 Background Script 中使用 `chrome.scripting.registerContentScripts` API 完成，这样的好处是可以控制特定的 Content Script 文件在什么时候被加载，以及可以修改和取消加载。或者用更老的 `chrome.scripting.executeScript` API 能够更加细致地控制往哪个 tab 注入脚本文件，或者直接注入一个函数[^3]。
对于最后一种方法，注意函数定义内的 `document`、`console` 等变量将是 Content Script 的变量，也就是网页自己的 `document`，而不是函数定义时的。

官方文档也讲到，Content Script 比 Background Script 安全性稍差，出入 Content Script 的数据可能会被黑客恶意截胡[^5][^6]。

## 真正的页面上下文

这是最后一个官方讲的少，但是 StackOverflow 上面经久不衰的一个话题，即页面 JS 脚本自己的上下文。虽然 Content Script 能完成大部分页面编辑的需求（通过 `document` 和 `windows`），但是如果我们想访问网页脚本定义的其他全局变量， Content Script 就无能为力了。比如我曾经尝试魔改我们学校的课程表规划网站，这个基于 web app 的规划工具自己在 JavaScript 里面整了一个全局变量叫 App，里面有很多可以直接用的 API，但是 Content Script 默认访问不到这个全局变量。这种直接运行在页面的 JS 上下文中的代码在开发者口中往往被称作 Page Script，虽然好处是可以访问页面中定义的变量，但是**坏处是无法访问 `chrome` API接口**[^8]（当然啦，官方文档怎么会提这个呢～）

首先最直白的方法，但也是官方故意没有说太多、而其他社区很少有人提到的，就是声明 Content Script 时的 [`world` 参数](https://developer.chrome.com/docs/extensions/reference/scripting/#type-ScriptInjection)，将它赋值 'MAIN' 即可。这应该是较新版本 Chrome 中的最优解。

在目前的开发者社区当中，流行的另一个解决方法是[^7]：为需要注入的代码单独创建一个 JS 文件，借助 Content Script 能访问 `document` 的力量创建 `<script>` 标签并指向该文件。即，在 Content Script 中执行如下代码
```js
var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');
s.onload = s.remove.bind(s);
(document.head || document.documentElement).appendChild(s);
```
同时想让 Content Script 能访问到这个 `script.js` 文件，需要在 `manifest.json` 中声明如下权限
```json
{
  "name": "My extension",
  "web_accessible_resources": [{
    "resources": ["script.js"],
    "matches": [...]
  }],
  ...
}
```

类似的，另一种网上经常能见到、**但是在新版本 Chrome 中已经失效的方法是**，直接把要注入的脚本内容写在新建的 script 标签里面：
```js
const codeToInject = `console.log('Hello')`
var s = document.createElement('script');
s.textContent = codeToInject;
s.onload = s.remove.bind (s);
(document.head || document.documentElement).appendChild (s);
```

失败的原因是新版的 Chrome 默认禁止网页随意执行 `<script>...</script>` 的代码块和 `<script src="不在 Content Security Policy 白名单"/>` 的外部代码。这个安全措施不是针对浏览器插件开发者，而是对所有网页都适用。

## 参考
[^1]: [Manage events with service workers](https://developer.chrome.com/docs/extensions/mv3/service_workers/)
[^2]: [API Reference: chrome.scripting](https://developer.chrome.com/docs/extensions/reference/scripting/#method-executeScript)
[^3]: [Content scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
[^4]: [Content scripts: Work in isolated worlds](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world)
[^5]: [Content scripts: Stay secure](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#security)
[^6]: [Stay secure: Use content scripts carefully](https://developer.chrome.com/docs/extensions/mv3/security/#content_scripts)
[^7]: [Use a content script to access the page context variables and functions](https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions)
[^8]: [Google Group discussion on Page Script](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/_zKyp9XvIzY/m/Pra2efOnAgAJ)