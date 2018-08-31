"use strict";

chrome.runtime.onInstalled.addListener(function () {
    init_database();
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === "show_emoji_selector") {
        send_message({"id": "open_emoji_selector"});
        return true;
    }
});

chrome.runtime.onMessage.addListener(function (message, _sender, sendResponse) {
    if (message.id === "db_get_first_emojis") {
        sendResponse(db_search_emojis(message.query));
    }
});

function send_message(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}