"use strict";

// Database. Creates it if it does not exist
let emoji_db = new localStorageDB('emoji_db', localStorage);

function init_database() {

    if (emoji_db.isNew()) {
        emoji_db.createTable('emojis', ['code_points', 'name', 'emoji']);

        db_save_all_emojis();
    }
}

function db_save_all_emojis() {

    get_all_emojis(function (all_emojis) {
        let lines = all_emojis.split(/[\n\r]+/g);
        for (let line of lines) {
            let emoji_line_regex = /^(.+);\s+fully-qualified\s+#\s+(\S+)\s+(.*)?$/gmu;
            let match = emoji_line_regex.exec(line);
            if (match) {
                let code_points = match[1].trim();
                let emoji = match[2];
                let name = match[3];
                emoji_db.insert('emojis', {code_points: code_points, emoji: emoji, name: name});
            }
        }
        emoji_db.commit();
    });
}

function get_all_emojis(callback) {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function () {
        callback(request.responseText);
    });
    request.open("GET", "https://unicode.org/Public/emoji/11.0/emoji-test.txt");
    request.send();
}

function db_search_emojis(query) {
    let emojis = emoji_db.queryAll('emojis', {
        query: function(row) {
            return query == null || row.name.includes(query);
        },
        limit: 32
    });
    return emojis.map(emoji => emoji.emoji);
}
