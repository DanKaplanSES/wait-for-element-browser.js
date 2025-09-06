# wait-for-element-browser.js

_This fork is meant for personal use, but it may help others._ I modified [wait-for-element.js](https://github.com/azu/wait-for-element.js/), reducing it down to its barebones logic, and removed any module system code. I've done this so the js files can be sourced within an HTML `head` element, like so (for a `MutationObserver` implementation):

```html
<html>
  <head>
    <script type="application/javascript" src="https://raw.githubusercontent.com/DanKaplanSES/wait-for-element-browser.js/refs/tags/1.0.2/lib/wait-by-observer.js"></script>
    <script type="application/javascript">
      // ...
      await waitForElement(selector, timeoutMillis)
      // ...
    </script>
  </head>
  <body></body>
</html>
```

Or like so (for a `setTimeout` implementation):

```html
<html>
  <head>
    <script type="application/javascript" src="https://raw.githubusercontent.com/DanKaplanSES/wait-for-element-browser.js/refs/tags/1.0.2/lib/wait-by-timer.js"></script>
    <script type="application/javascript">
      // ...
      await waitForElement(selector, timeoutMillis)
      // ...
    </script>
  </head>
  <body></body>
</html>
```

I also added my own [whileElementExists](https://github.com/DanKaplanSES/wait-for-element-browser.js/blob/master/lib/while-element-exists-timer.js) function. It's currently only timer (i.e., interval) based. It can be used like this:

```html
<html>
  <head>
    <script type="application/javascript" src="https://raw.githubusercontent.com/DanKaplanSES/wait-for-element-browser.js/refs/tags/1.0.2/lib/while-element-exists-timer.js"></script>
    <script type="application/javascript">
      // ...
      const intervalId = whileElementExists(`.dynamic-header`, 1000, (dynamicHeaderElement) => {
        if ($(`.my-new-element`, $(`.dynamic-header`)).length === 0) {
            $(`.dynamic-header`).append(`<a class="my-new-element" href="https://example.org" rel="noopener follow">example.org</a>`)
        }
      })
      // ...
    </script>
  </head>
  <body></body>
</html>
```
