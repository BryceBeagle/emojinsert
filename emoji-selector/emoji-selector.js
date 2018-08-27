// import emoji_entry from './emoji-entry'

chrome.runtime.onMessage.addListener(
    function (_request, _sender, sendResponse) {
        let textbox = get_active_textbox();

        if (textbox) {
            create_emoji_selector(textbox);
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

create_emoji_selector = function (textbox) {

    // Surrounding emoji-selector
    let emoji_selector = es_emoji_selector(textbox);
    document.body.appendChild(emoji_selector);

};

// https://stackoverflow.com/questions/39871916/is-it-possible-to-generate-all-the-emojis-and-append-to-the-select-dropdown
// https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply