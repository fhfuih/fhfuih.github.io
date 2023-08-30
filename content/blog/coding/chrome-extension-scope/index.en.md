---
title: "Different Contexts of Chrome Extension Scripts"
date: 2023-08-30T16:00:00+08:00
lang: en
draft: false
categories: []
tags:
  - Chrome
  - browser extension
  - JavaScript
  - CSS
---

## Intro
Had you ever written a Chrome browser extension,
you must have been struggling to differenciate the
contexts of every script file in your project.
There are *content scripts*, *background scripts*,
and scripts in a popup page.
Chrome's official documentation have never systematically caompare
their differences;
and due to their so called "safety concern",
the documentation deliberately omits many details,
and sometimes uses inconsistent terms themselves!
That's why this blog is born,
after my own struggling and the collective intelligence on StackOverflow.

> Notice: This article is based on the latest [Chrome Extension Manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/) at the time of writing.

## Popup UI

Popup page is an early encounter in the 
[Getting Started](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
chapter of the official documentation.
It is literally the "popup" page after clicking the extension icon on the browser's menu bar,
hence, there is the script for that mini webpage.
It is often called `popup.js` in the official documentation.
There is also sometimes an `option.js`,
with with I'm not quite familiar.
But it should be similar and serve for another option page.

To declare that a JS script works for a popup page,
simply include it in a script tag in the popup HTML file.
Additionally, you need to declare the HTML file as a popup in the
`manifest.json` configuration file.

For such popup page scripts,
**the `document` and `window` variables all refer to this dedicated page**.
For example,
`document` is this page's DOM,
and `window.location.href` is the URL of this particular page
(which looks like `chrome-extension://<extension ID>/popup.html`).
**Note that `console` is also dedicate and it is hidden by default**.
You can right click on the icon on the extension toolbar and choose
"Inspect the popup page" to see its DOM and console.

Regarding the permissions,
obviously it doesn't have access to the current webpage directly,
but it can use `chrome.*` API (if declared in `manifest.json`).

## Background Script

The official [Getting Started](https://developer.chrome.com/docs/extensions/mv3/getstarted/) tutorial has another `background.js`.
In v3, background scripts are based on service workers.
Therefore, they are loaded on-demand after specific events
and have an independent context.
They **don't have `document` or `window` variables, but do have a dedicated `console`**.
The `console` can be seen at the extension management page.

{{<figure src="background-script.jpg" alt="Chrome extension management page" width="350">}}
![](background-script.jpg)

A common paradigm[^1] is to put computational stuff in the background script,
and use `chrome.*.on*.addListener` to invoke them like cloud functions.

## Content Script

Except for these types of scripts that the Chrome team is eager to introduce,
there is also one common but less introduced 
[Content Script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world).
It's context is isolated but somewhat overlaps with the webpage itself[^4].
**They share some global variables like `document`, `console`, and
some methods of `window` (e.g., `window.postMessage`, but I can't find a thorough list).
And content scripts can use a subset of `chrome.*` API[^3].**
Therefore,
they can manipulate the DOM, add event listeners, etc.
If dynamic values are used to update the page,
we can let the background script to perform relevant calculations
and wait for it to return the dynamic values.
Also,
the content scripts are not limited to JavaScript.
It accepts CSS files as well.

There are many ways to declare content scripts.
If putting the file names in the `manifest.json` file,
they will be injected at some time after the DOM is loaded.
We can also inject entire files using the
`chrome.scripting.registerContentScripts` API in the background script.
This is especially useful if we want to control whether and when to inject certain files.
These injections can be midified and revoked as well.
Lastly, we can use an older `chrome.scripting.executeScript` API.
It allows finer control like injecting to certain tabs only
and injecting functions instead of files[^3].
For the last `chrome.scripting.executeScript` method,
the `document`, `window`, `console` variables inside the function definition
will be those of the content script (i.e., those of the webpage),
not where the function is defined.

The official document has also mentioned that content scripts are less safe than background scripts[^5][^6].
So use it wisely.

## The real page context

This is a less-mentioned feature by a hot topic on StackOverflow.
Although, by default, the content scripts
can assess `document`, `window`, and `console`,
it can't access other self-defined global variables,
like those defined by libraries and other scripts that ship with the web app.
For example,
I used to extend our university's timetable planner website,
and this web app has an `App` global variable
with many functions to perform high-level timetable operations.
There are ways to let some "content scripts" run in the main webpage context so that they can access such global variables.
But a downside is that **it cannot use any `chrome.*` API**.

The first and most straightforward method is to use the `chrome.scripting.executeScript` API and set the [`world` option](https://developer.chrome.com/docs/extensions/reference/scripting/#type-ScriptInjection) to `MAIN`.
This should be the best practice for newer versions of Chrome.

Before this option is available,
there is another method that prevails in developers' communities[^7].
We can create a dedicated JS file for the injected scripts,
and use regular content scripts to create a `<script>` tag that referes to it.
That is, we can run the following code in the regular content script:
```js
var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');
s.onload = s.remove.bind(s);
(document.head || document.documentElement).appendChild(s);
```
Meanwhile, to permit the content script access to the injected page-context script,
we must declare it in the manifest file:
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

There is a similar method out there in the wild but it is no longer possible,
which is to directly write the injected scripts in the `<script>` tag:
```js
const codeToInject = `console.log('Hello')`
var s = document.createElement('script');
s.textContent = codeToInject;
s.onload = s.remove.bind (s);
(document.head || document.documentElement).appendChild (s);
```

The reason is that recent versions of Chrome disallow webpages to
execute arbitrary `<script>...</script>` codes or
`<script src="some files outside the Content Security Policy whitelist"/>`.
This is not an extension-only policy,
but it applies for every occurance in every webpage.

## 参考
[^1]: [Manage events with service workers](https://developer.chrome.com/docs/extensions/mv3/service_workers/)
[^2]: [API Reference: chrome.scripting](https://developer.chrome.com/docs/extensions/reference/scripting/#method-executeScript)
[^3]: [Content scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
[^4]: [Content scripts: Work in isolated worlds](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world)
[^5]: [Content scripts: Stay secure](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#security)
[^6]: [Stay secure: Use content scripts carefully](https://developer.chrome.com/docs/extensions/mv3/security/#content_scripts)
[^7]: [Use a content script to access the page context variables and functions](https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions)
[^8]: [Google Group discussion on Page Script](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/_zKyp9XvIzY/m/Pra2efOnAgAJ)