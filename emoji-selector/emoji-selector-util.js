"use strict";

function emoji_search(query, callback) {
    let message = {"id": "db_get_first_emojis", "query": query};
    chrome.runtime.sendMessage(message, function (emojis) {
        callback(emojis)
    });
}