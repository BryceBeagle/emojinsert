chrome.commands.onCommand.addListener(function (command) {
    chrome.storage.sync.get('color', function (data) {
        color = data.color;
        chrome.tabs.executeScript(
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
    console.log('Command:', command);
});
