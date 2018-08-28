"use strict";

chrome.runtime.onInstalled.addListener(function () {
    init_database(get_all_emojis)
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === "show-emoji-selector") {
        send_signal();
        return true;
    }
});

function init_database(callback) {
    // No reason to keep old version around. We just installed this extension
    indexedDB.deleteDatabase("emoji_db");

    // Create a new database to hold emojis
    let request = indexedDB.open('emoji_db', 1);
    request.onupgradeneeded = function (event) {

        let database = event.target.result;
        let object_store = database.createObjectStore("emojis", {keyPath: "code_points"});

        object_store.createIndex("name", "name", {unique: false});
        object_store.createIndex("emoji", "emoji", {unique: true});

        object_store.transaction.oncomplete = function () {
            callback(database);
        }
    };
}

function send_signal() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {});
    });
}

function get_all_emojis(database) {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function () {
        save_all_emojis(request.responseText, database);
    });
    request.open("GET", "https://unicode.org/Public/emoji/11.0/emoji-test.txt");
    request.send();
}

function save_all_emojis(response_text, database) {
    let emoji_object_store = database.transaction("emojis", "readwrite").objectStore("emojis");
    console.log(emoji_object_store);

    let lines = response_text.split(/[\n\r]+/g);
    for (let line of lines) {
        let emoji_line_regex = /^(.+);\s+fully-qualified\s+#\s+(\S+)\s+(.*)?$/gmu;
        let match = emoji_line_regex.exec(line);
        if (match) {
            let code_points = match[1].trim();
            let emoji = match[2];
            let name = match[3];
            emoji_object_store.add({code_points: code_points, emoji: emoji, name: name})
        }
    }
}