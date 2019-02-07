"use strict";

// Global storage of the emoji selector to avoid creating it twice on the same page
let emojinsert = null;

/* Get the active textbox on the window, ie. the one with the blinking cursor the user is typing in */
function get_active_textbox() {
    let activeElement = document.activeElement;

    // Is there an active element, and if so, is it of type `text`? Other types of active elements could be checkboxes
    // or radio buttons
    if (activeElement && activeElement.contentEditable) {
        return activeElement;
    }
}

/* Add a listener for the `open_emoji_selector` message. This comes from the background.js page */
chrome.runtime.onMessage.addListener(
    function (message, _sender, sendResponse) {

        if (message.id === "open_emoji_selector") {

            let textbox = get_active_textbox();

            // If no text box is active, don't do anything
            if (!textbox) {
                return
            }

            if (emojinsert) {
                emojinsert.active_textbox = textbox;
                emojinsert.style.display = "initial";
                emojinsert.search_box.value = "";
            } else {
                emojinsert = new Emojinsert(textbox);
                document.body.append(emojinsert);
            }
            emojinsert.search_box.focus();

            let position_rect = textbox.getBoundingClientRect();
            emojinsert.style.top = `${position_rect.top + 35}px`;
            emojinsert.style.left = `${position_rect.left}px`;

        }
        sendResponse();
    }
);