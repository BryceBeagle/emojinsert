"use strict";

// Global storage of the emoji selector to avoid creating it twice on the same page
let emojinsert = null;

/* Add a listener for the `open_emoji_selector` message. This comes from the background.js page */
chrome.runtime.onMessage.addListener(
    function (message, _sender, sendResponse) {

        if (message.id === "open_emoji_selector") {

            let textbox = get_active_textbox();

            // If no text box is active, don't do anything
            if (!textbox || (emojinsert && emojinsert.active_textbox)) {
                return
            }

            if (emojinsert) {
                emojinsert.active_textbox = textbox;
                emojinsert.style.display = "initial";
            } else {
                emojinsert = new Emojinsert(textbox);
                document.body.append(emojinsert);
            }

            // Position the selector properly once the selector is fully constructed and properly sized
            // TODO: This is really ugly and surely there's a better asynchronous way of doing this.
            Promise.all(
                [emojinsert.setStyle(), emojinsert.searchAndPopulateEmojiGrid(null)]
            ).then(() => {
                emojinsert.setPositionAndOrder.bind(emojinsert)();
            });

            emojinsert.search_box.focus();

        }
        sendResponse();
    }
);