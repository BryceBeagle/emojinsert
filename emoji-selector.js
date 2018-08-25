create_modal = function () {
    wrapperDiv = document.createElement("div");
    wrapperDiv.setAttribute("style", "position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");

    iframeElement = document.createElement("iframe");
    iframeElement.setAttribute("style", "width: 100%; height: 100%;");

    wrapperDiv.appendChild(iframeElement);

    modalDialogParentDiv = document.createElement("div");
    modalDialogParentDiv.setAttribute("style", "position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");

    modalDialogSiblingDiv = document.createElement("div");

    modalDialogTextDiv = document.createElement("div");
    modalDialogTextDiv.setAttribute("style", "text-align:center");

    modalDialogTextSpan = document.createElement("span");
    modalDialogText = document.createElement("strong");
    modalDialogText.innerHTML = "Processing...  Please Wait.";

// breakElement = document.createElement("br");

    modalDialogTextSpan.appendChild(modalDialogText);
    modalDialogTextDiv.appendChild(modalDialogTextSpan);
// modalDialogTextDiv.appendChild(breakElement);
// modalDialogTextDiv.appendChild(breakElement);

    modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
    modalDialogParentDiv.appendChild(modalDialogSiblingDiv);

    document.body.appendChild(wrapperDiv);
    document.body.appendChild(modalDialogParentDiv);
};

get_active_textbox = function () {
    let activeElement = document.activeElement;

    if (activeElement && activeElement.type === "text") {
        return activeElement;
    }
};


chrome.runtime.onMessage.addListener(
    function (_request, _sender, sendResponse) {
        let active_element = get_active_textbox();
        console.log("Active element:", get_active_textbox());

        if (active_element) {
            console.log("ParentNode:", active_element.parentNode);
            create_modal();
        }

        sendResponse();

    });
