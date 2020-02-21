//PREVIEW SWITCHER
function switchPreview() {
    chrome.tabs.executeScript({
        file: '/scripts/previewSwitch/previewSwitch.js'
    });
}
document.querySelector(".js__switch__preview").addEventListener("click", function (e) {
    switchPreview();
});


//CHECK FOR BAD LINKS ON PAGE
function checkBadLinks() {
    // chrome.tabs.executeScript({
    //     file: '/scripts/linkChecker/initLinkChecker.js'
    // });
    chrome.tabs.executeScript({
        file: '/scripts/linkChecker/linkChecker.js'
    });
}
document.querySelector(".js__check__links").addEventListener("click", function (e) {
    checkBadLinks();
});

