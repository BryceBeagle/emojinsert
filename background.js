chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({color: '#3aa757'}, function () {
        console.log("The color is green.");
    });
});

chrome.commands.onCommand.addListener(function (command) {
    chrome.storage.sync.get('color', function (data) {
        color = data.color;
        console.log('Color:', color);
        chrome.tabs.executeScript(
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
    console.log('Command:', command);
});
