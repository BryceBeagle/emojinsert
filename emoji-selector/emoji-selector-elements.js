"use strict";

/* Create an emoji selector UI element */
function es_emoji_selector(textbox) {

    // Create a new div at the top level of the DOM and give it a class name of `emoji-selector`
    let emoji_selector = document.createElement("div");
    emoji_selector.className = "emoji-selector";

    // Create a 4x8 grid of emojis and populate it (grabs first 32 emojis on the list)
    emoji_selector.emoji_grid = es_emoji_grid(4, 8, textbox);
    emoji_search(null, function (emojis) {
        populate_emoji_grid(emoji_selector.emoji_grid, emojis);
    });

    // Search box for searching for emojis by name or other attribute
    emoji_selector.search_box = es_search_box();

    // Add the grid and search box elements to the DOM as children of the main UI element
    emoji_selector.appendChild(emoji_selector.search_box);
    emoji_selector.appendChild(emoji_selector.emoji_grid);

    // Listen for changes to the textbox's value TODO: react to changes through javascript
    emoji_selector.search_box.addEventListener("input", function () {
        emoji_search(emoji_selector.search_box.value, function (emojis) {
            populate_emoji_grid(emoji_selector.emoji_grid, emojis);
        });
    });

    // Hide the UI element if a click is performed anywhere but on the UI element
    emoji_selector.addEventListener("click", function (event) {
        event.stopPropagation();
    });
    addEventListener("click", function () {
        emoji_selector.style.display = "none";
    });

    // Hide the UI element if ESC is pressed
    addEventListener("keydown", function (event) {
        if (event.code === "Escape") {
            emoji_selector.style.display = "none";
        }
    });

    return emoji_selector;
}

/* Create the grid to populate with emojis */
function es_emoji_grid(num_rows, num_columns, textbox) {

    let emoji_grid = document.createElement("table");
    emoji_grid.className = "emoji-grid";

    // Create each cell in the grid
    for (let row_num = 0; row_num < num_rows; row_num++) {
        let row = emoji_grid.insertRow();
        for (let column_num = 0; column_num < num_columns; column_num++) {
            let cell = row.insertCell();

            // Insert a cell's emoji into the active textbox where the cursor is when clicked
            cell.onclick = function () {
                textbox.focus();
                document.execCommand('insertText', false, cell.innerText)
            };
        }
    }

    return emoji_grid;

}

function es_search_box() {
    let search_box = document.createElement("input");
    search_box.className = 'emoji-search-box';

    return search_box;
}

/* Populate the grid with emojis
*  If there are more cells than emojis, blanks are inserted
*  If there are more emojis than cells, they are ignored
*/
function populate_emoji_grid(emoji_grid, emojis) {

    let emoji_iter = emojis.values();

    for (let row of emoji_grid.rows) {
        for (let cell of row.cells) {
            let emoji_item = emoji_iter.next().value;
            cell.innerText = emoji_item ? emoji_item.emoji : '';
            cell.title = emoji_item ? emoji_item.name : null;
            cell.style.tooltip = cell.title;
        }
    }
}
