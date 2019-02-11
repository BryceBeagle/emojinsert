"use strict";

class Emojinsert extends HTMLElement {

    constructor(active_textbox) {
        super();
        this.active_textbox = active_textbox;
        this.attachShadow({mode: 'open'});
    }

    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        this.setup();
        this.setEventListeners();
    }

    setup() {

        this.search_box = new_emojinsert_search_box();
        this.shadowRoot.append(this.search_box);

        this.emoji_grid = new_emojinsert_grid(4, 8);
        this.shadowRoot.append(this.emoji_grid);

    }

    setEventListeners() {

        // Listen for changes to the textbox's value
        this.search_box.addEventListener("input", () => {
            this.searchAndPopulateEmojiGrid(this.search_box.value);
        });

        // Insert text if emoji was clicked, then hide emojinsert
        this.addEventListener("emoji-clicked", (event) => {
            let emoji = event.detail.emoji;
            this.active_textbox.focus();
            document.execCommand('insertText', false, emoji);
            this.hide();
        });

        // If emojinsert is clicked, prevent event from bubbling any further
        this.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // Hide emojinsert if anything but emojinsert is clicked
        document.addEventListener("click", () => {
            this.hide();
        });

        // Hide the UI element if ESC is pressed
        document.addEventListener("keydown", (event) => {
            if (event.code === "Escape") {
                this.hide();
            }
        });
    }

    setStyle() {
        return new Promise((resolve) => {
            // https://blog.railwaymen.org/chrome-extensions-shadow-dom/
            const url = chrome.extension.getURL("emoji-selector/emoji-selector.css");
            fetch(url, {method: 'GET'}).then(resp => resp.text()).then(css => {
                let sheet = document.createElement("style");
                sheet.innerHTML = css;
                this.shadowRoot.appendChild(sheet);
                resolve();
            });
        });
    };

    searchAndPopulateEmojiGrid(search) {
        return new Promise((resolve) => {
            emoji_search(search, (emojis) => {
                this.PopulateEmojiGrid(emojis);
                resolve();
            });
        });
    }

    /* Populate the grid with emojis
    *  If there are more cells than emojis, blanks are inserted
    *  If there are more emojis than cells, they are ignored
    */
    PopulateEmojiGrid(emojis) {
        let emoji_iter = emojis.values();

        for (let row of this.emoji_grid.rows) {
            for (let cell of row.cells) {
                let emoji_item = emoji_iter.next().value;
                cell.innerText = emoji_item ? emoji_item.emoji : '';
                cell.title = emoji_item ? emoji_item.name : null;
                cell.style.tooltip = cell.title;
            }
        }
    }

    setPositionAndOrder() {

        let position_rect = this.active_textbox.getBoundingClientRect();
        let top_position = position_rect.top + this.active_textbox.clientHeight;

        let window_height = window.innerHeight;

        if (top_position + this.clientHeight < window_height) {
            this.style.top = `${top_position}px`;
        } else {
            console.log("2");
            this.style.bottom = `${window_height - top_position}px`;
            this.shadowRoot.insertBefore(this.emoji_grid, this.search_box);
        }

        this.style.left = `${position_rect.left}px`;

    }

    hide() {

        if (!this.active_textbox) {
            return;
        }

        this.active_textbox.focus();
        this.active_textbox = null;
        this.search_box.value = "";
        this.style.display = "none";
    }

}

customElements.define('emojinsert-element', Emojinsert);

/* Create the grid to populate with emojis */
function new_emojinsert_grid(num_rows, num_columns) {

    let emoji_grid = document.createElement("table");
    emoji_grid.className = "emojinsert-grid";

    // Create each cell in the grid
    for (let row_num = 0; row_num < num_rows; row_num++) {
        let row = emoji_grid.insertRow();
        for (let column_num = 0; column_num < num_columns; column_num++) {
            let cell = row.insertCell();
            cell.className = "emojinsert-emoji";

            // Insert a cell's emoji into the active textbox where the cursor is when clicked
            cell.onclick = function (event) {
                event.stopPropagation();
                cell.dispatchEvent(new CustomEvent('emoji-clicked', {
                    bubbles: true,
                    composed: true,
                    detail: {emoji: cell.innerText}
                }));
            };
        }
    }

    return emoji_grid;

}

function new_emojinsert_search_box() {
    let search_box = document.createElement("input");
    search_box.className = "emojinsert-search-box";

    return search_box;
}

