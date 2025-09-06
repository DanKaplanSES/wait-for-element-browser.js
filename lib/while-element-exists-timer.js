// LICENSE : MIT
"use strict";
/**
 * @param {string} selector the css selector
 * @param {number} delay delay between callback calls in millisecond
 * @param {(element: Element): void} callback A synchronous callback, called once per matching element after each delay.
 * @returns {number} a setInterval ID that can be passed into clearInterval() to stop the loop.
 */
function whileElementExists(selector, delay, callback) {
    const intervalId = setInterval(function () {
        document.querySelectorAll(selector).forEach(function (match) {
            callback(match);
        })
    }, delay);

    return intervalId;
}
