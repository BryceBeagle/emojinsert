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
    let emoji_grid = es_emoji_grid(8);

    emoji_selector.appendChild(search_box);
    emoji_selector.appendChild(emoji_grid);

    search_box.addEventListener("input", function () {
        emoji_search(search_box.value, function (emojis) {
            let all_emojis = emojis;
            console.log(all_emojis);
        });
    });

    return emoji_selector;

}

function es_search_box() {
    let search_box = document.createElement("input");
    return search_box;
}

function es_emoji_grid(num_columns) {

    let table = document.createElement("table");
    table.style.tableLayout = "fixed";

    emoji_search(null, function (emojis) {
        let i = 0;
        while (emojis[i]) {
            let row = table.insertRow();
            for (let col = 0; col < num_columns; col++) {
                let cell = row.insertCell();
                let char = emojis[i++];
                cell.innerText = char ? char : "";
            }
        }
    });

    return table;

}