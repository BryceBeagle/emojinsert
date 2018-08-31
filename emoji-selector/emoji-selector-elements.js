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

    let search_box = es_search_box();
    let emoji_grid = es_emoji_grid(4, 8);
    emoji_search(null, function (emojis) {
        populate_emoji_grid(emoji_grid, emojis);
    });

    emoji_selector.appendChild(search_box);
    emoji_selector.appendChild(emoji_grid);

    search_box.addEventListener("input", function () {
        emoji_search(search_box.value, function (emojis) {
            populate_emoji_grid(emoji_grid, emojis);
        });
    });

    return emoji_selector;

}

function es_search_box() {
    let search_box = document.createElement("input");
    search_box.id = 'emoji_search_box';
    return search_box;
}

function es_emoji_grid(num_rows, num_columns) {

    let table = document.createElement("table");
    table.style.tableLayout = "fixed";

    for (let row_num = 0; row_num < num_rows; row_num++) {
        let row = table.insertRow();
        for (let column_num = 0; column_num < num_columns; column_num++) {
            row.insertCell();
        }
    }

    return table;

}

function populate_emoji_grid(emoji_grid, emojis) {

    console.log(emojis);

    let emoji_iter = emojis.values();

    for (let row of emoji_grid.rows) {
        for (let cell of row.cells) {
            let emoji = emoji_iter.next().value;
            cell.innerText = emoji ? emoji : '';
        }
    }

}