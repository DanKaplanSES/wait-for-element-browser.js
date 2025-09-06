// LICENSE : MIT
"use strict";
/**
 * @param {string} selector the css selector
 * @param {number} delay Optional delay between callback calls in millisecond
 * @param {(element: Element): void} callback A synchronous callback, called once per matching element after each delay.
 * @returns {number} a setInterval ID that can be passed into clearInterval() to stop the loop.
 */
function whileElementVisible(selector, delay, callback) {
    var delayOption = delay || 2000;
    const intervalId = setInterval(function () {
        document.querySelectorAll(selector).forEach(function (match) {
            callback(match);
        })
    }, delayOption);

    return intervalId;
}
