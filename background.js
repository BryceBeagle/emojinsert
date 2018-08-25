send_signal = function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {});
    });
};

chrome.commands.onCommand.addListener(function (command) {
    if (command === "show-emoji-selector") {
        send_signal();
    }
});
