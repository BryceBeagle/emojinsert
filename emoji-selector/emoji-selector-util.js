function emoji_search(query) {
    let message = {"id": "db_get_first_emojis", "query": query};
    chrome.runtime.sendMessage(message, function (response) {
        console.log(response)
    });
}