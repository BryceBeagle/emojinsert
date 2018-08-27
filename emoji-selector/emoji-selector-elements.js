"use strict";

function es_emoji_selector(textbox) {

    let emoji_selector = document.createElement("div");
    emoji_selector.className = "emoji-selector";

    let position_rect = textbox.getBoundingClientRect();

    // TODO: Use CSS
    emoji_selector.style.position = "absolute";
    emoji_selector.style.height = "50px";
    emoji_selector.style.border = "1px solid rgb(51, 102, 153)";
    emoji_selector.style.padding = "10px";
    emoji_selector.style.backgroundColor = "rgb(255, 255, 255)";
    emoji_selector.style.zIndex = "1000";
    emoji_selector.style.overflowY = "auto";
    emoji_selector.style.textAlign = "center";

    emoji_selector.style.top = `${position_rect.top}px`;
    emoji_selector.style.left = `${position_rect.left}px`;
    emoji_selector.appendChild(es_emoji_grid(8));

    return emoji_selector;

}

function es_emoji_grid(num_columns) {

    let table = document.createElement("table");
    table.style.tableLayout = "fixed";

    let characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '\u{1F4A9}'];

    let i = 0;
    while (characters[i]) {
        let row = table.insertRow();
        for (let col = 0; col < num_columns; col++) {
            let cell = row.insertCell();
            let char = characters[i++];
            cell.innerText = char ? char : ""
        }
    }

    return table;

}