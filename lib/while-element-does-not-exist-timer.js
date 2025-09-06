// LICENSE : MIT
"use strict";
/**
 * @param {string} selector the css selector
 * @param {number} delay delay between callback calls in millisecond
 * @param {(): void} callback A synchronous callback, called after each delay when the selector does not match.
 * @returns {number} a setInterval ID that can be passed into clearInterval() to stop the loop.
 */
function whileElementDoesNotExist(selector, delay, callback) {
    const intervalId = setInterval(function () {
        let matchCount = 0;
        document.querySelectorAll(selector).forEach(function () {
            matchCount++;
        })
        if (matchCount === 0) {
            callback();
        }
    }, delay);

    return intervalId;
}
