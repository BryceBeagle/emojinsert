// import emoji_entry from './emoji-entry'

chrome.runtime.onMessage.addListener(
    function (_request, _sender, sendResponse) {

        let textbox = get_active_textbox();

        if (textbox) {
            create_emoji_selector(textbox);
            let request = indexedDB.open('emoji_db', 1);
            request.onsuccess = function (event) {
                console.log(event.target.result);
            };
        }
        sendResponse();
    }
);

function get_active_textbox() {
    let activeElement = document.activeElement;

    if (activeElement && activeElement.type === "text") {
        return activeElement;
    }
}

function create_emoji_selector(textbox) {

    // Surrounding emoji-selector
    let emoji_selector = es_emoji_selector(textbox);
    document.body.appendChild(emoji_selector);

}

// https://stackoverflow.com/questions/39871916/is-it-possible-to-generate-all-the-emojis-and-append-to-the-select-dropdown
// https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply