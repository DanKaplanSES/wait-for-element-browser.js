# wait-for-element-browser.js

_This fork is meant for personal use, but it may help others._ I modified [wait-for-element.js](https://github.com/azu/wait-for-element.js/), reducing it down to its barebones logic, and removed any module system code. I've done this so the js files can be sourced within an HTML `head` element, like so (for a `MutationObserver` implementation):

```html
<html>
  <head>
    <script type="application/javascript" src="https://raw.githubusercontent.com/DanKaplanSES/wait-for-element-browser.js/refs/tags/1.0.1/lib/wait-by-observer.js"></script>
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
    <script type="application/javascript" src="https://raw.githubusercontent.com/DanKaplanSES/wait-for-element-browser.js/refs/tags/1.0.1/lib/wait-by-timer.js"></script>
    <script type="application/javascript">
      // ...
      await waitForElement(selector, timeoutMillis)
      // ...
    </script>
  </head>
  <body></body>
</html>
```


