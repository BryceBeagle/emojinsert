"use strict";

// Global storage of the emoji selector to avoid creating it twice on the same page
let emojinline = null;

/* Add a listener for the `open_emoji_selector` message. This comes from the background.js page */
chrome.runtime.onMessage.addListener(
    function (message, _sender, sendResponse) {

        if (message.id === "open_emoji_selector") {
            open_emoji_selector();
        }
        sendResponse();
    }
);

/* Entry point to creation of emoji selector UI element */
function open_emoji_selector() {

    // Get the textbox the user is inserting an emoji into
    let textbox = get_active_textbox();

    // If there's not an active textbox, there's nothing to do
    if (!textbox) {
        return;
    }

    // Have we created the UI element before?
    if (emojinline) {
        // If so, reshow it and and focus its search textbox
        emojinline.style.display = "initial";
        emojinline.search_box.focus();
        emojinline.search_box.value = "";
    } else {
        // Otherwise, we need to create it for the first time on this page
        emojinline = es_emoji_selector(textbox);

        // Add the UI element to the DOM. The stylesheet will control its position
        document.body.appendChild(emojinline);
    }

    // Set the position of the UI element to be above the active textbox
    let position_rect = textbox.getBoundingClientRect();
    emojinline.style.top = `${position_rect.top + 25}px`;
    emojinline.style.left = `${position_rect.left}px`;

}

/* Get the active textbox on the window, ie. the one with the blinking cursor the user is typing in */
function get_active_textbox() {
    let activeElement = document.activeElement;

    // Is there an active element, and if so, is it of type `text`? Other types of active elements could be checkboxes
    // or radio buttons
    if (activeElement && activeElement.type === "text") {
        return activeElement;
    }
}

// https://stackoverflow.com/questions/39871916/is-it-possible-to-generate-all-the-emojis-and-append-to-the-select-dropdown
// https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply