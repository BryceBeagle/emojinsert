"use strict";

function emoji_search(query, callback) {
    let message = {"id": "db_get_first_emojis", "query": query};
    chrome.runtime.sendMessage(message, function (emojis) {
        callback(emojis)
    });
}

/* Get the active textbox on the window, ie. the one with the blinking cursor the user is typing in */
function get_active_textbox() {
    let activeElement = document.activeElement;

    if (!activeElement) {
        return null;
    }

    if (activeElement.isContentEditable) {
        return activeElement;
    }

    if (activeElement.tagName === 'INPUT' && /^(text|number|search|url)$/i.test(activeElement.type)) {
        return activeElement;
    }

    return null;
}