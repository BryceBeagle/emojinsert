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

    // Is there an active element, and if so, is it of type `text`? Other types of active elements could be checkboxes
    // or radio buttons
    if (activeElement && activeElement.contentEditable) {
        return activeElement;
    }
}