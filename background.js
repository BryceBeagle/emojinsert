"use strict";

chrome.runtime.onInstalled.addListener(function() {
    get_all_emojis();
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === "show-emoji-selector") {
        send_signal();
    }
});

function send_signal() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {});
    });
}

function get_all_emojis() {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function () {
        save_all_emojis(request.responseText);
    });
    request.open("GET", "https://unicode.org/Public/emoji/11.0/emoji-test.txt");
    request.send();
}

function save_all_emojis(response_text) {
    let lines = response_text.split(/[\n\r]+/g);
    let i = 0;
    for (let line of lines) {
        let emoji_line_regex = /^(.+);\s+fully-qualified\s+#\s+(\S+)\s+(.*)?$/gmu;
        let match = emoji_line_regex.exec(line);
        if (match) {
            let code_points = match[1].trim().split();
            let emoji = match[2];
            let name = match[3];
            console.log(i++, "Code Points:", code_points, "| Emoji:", emoji, "| Name: ", name);
        }
    }
}