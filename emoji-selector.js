create_modal = function (textbox) {

    // Surrounding emoji-selector
    let emoji_selector = document.createElement("div");
    emoji_selector.className = "emoji-selector";

    let position_rect = textbox.getBoundingClientRect();
    emoji_selector.setAttribute("style",
        "position: absolute; " +
        "width: 350px; " +
        "border: 1px solid rgb(51, 102, 153); " +
        "padding: 10px; " +
        "background-color: rgb(255, 255, 255); " +
        "z-index: 1000; " +
        "overflow: auto; " +
        "text-align:center; " +
        `top: ${position_rect.top}px; left: ${position_rect.left}px;`);
    document.body.appendChild(emoji_selector);

    // Text field
    let modalDialogTextSpan = document.createElement("span");
    modalDialogTextSpan.innerHTML = "Processing...  Please Wait.";

    emoji_selector.appendChild(modalDialogTextSpan);
};

chrome.runtime.onMessage.addListener(
    function (_request, _sender, sendResponse) {
        let textbox = get_active_textbox();

        if (textbox) {
            create_modal(textbox);
        }
        sendResponse();
    }
);

get_active_textbox = function () {
    let activeElement = document.activeElement;

    if (activeElement && activeElement.type === "text") {
        return activeElement;
    }
};

// https://stackoverflow.com/questions/39871916/is-it-possible-to-generate-all-the-emojis-and-append-to-the-select-dropdown
// https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply