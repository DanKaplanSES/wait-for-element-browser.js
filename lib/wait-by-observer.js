// LICENSE : MIT
"use strict";
/**
 * @param {string} selector the css selector
 * @param {number} timeout the timeout is millisecond
 * @returns {Promise}
 */
function waitForElement(selector, timeout = 5000) {
    let attributeFilter = attributeFilterFromSelector(selector);

    let attributes = true;
    if (attributeFilter && attributeFilter.length === 0) {
        attributes = false;
    }

    function attributeFilterFromSelector(selector) {
        let attributeFilter = [];
        if (selector.includes(`.`)) {
            attributeFilter.push(`class`)
        }
        if (selector.includes(`#`)) {
            attributeFilter.push(`id`)
        }
        // If selecting a named attribute, don't filter by any in particular
        if (selector.includes(`[`)) {
            attributeFilter = undefined;
        }
        // If there are no attributes in the selector, don't filter any
        if (attributeFilter.length === 0) {
            attributeFilter = undefined;
        }
        return attributeFilter;
    }

    return new Promise((resolve, reject) => {
        // Is it already on the page?
        const el = document.querySelector(selector);
        if (el) {
            return resolve(el)
        };

        const observer = new MutationObserver((mutations, obs) => {
            for (let mutation of mutations) {
                for (let node of mutation.addedNodes) {
                    if (!(node instanceof Element)) {
                        continue;
                    }
                    // Check newly added nodes
                    if (node.matches(selector)) {
                        return found(node);
                    }
                    // And their descendants
                    const descendantFound = node.querySelector(selector);
                    if (descendantFound) {
                        return found(descendantFound);
                    }
                }
                if (mutation.type === 'attributes'
                    && mutation.attributeName === 'class') {
                    const tgt = mutation.target;
                    if (tgt.matches(selector)) {
                        return found(tgt);
                    }
                }
            }
        });

        function found(found) {
            clearTimeout(timer);
            observer.disconnect();
            resolve(found);
        }

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes,
            attributeFilter
        });

        const timer = setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timed out waiting for selector "${selector}"`));
        }, timeout);
    });
}
