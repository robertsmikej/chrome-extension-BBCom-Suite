//ON ICON CLICK FIRE PREVIEW SWITCH
chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.ib, {
		file: 'scripts/previewSwitch/previewSwitch.js'
	});
});

let parentItem = {
    title: "Bodybuilding.com",
    id: "bbcom__context",
    contexts:["all"]
};
chrome.contextMenus.create(parentItem);

let children = [
    {
        title: "Check Bad Links",
        id: "check__bad__links",
        parentId: "bbcom__context",
        contexts:["all"]
    }
];
for (let c in children) {
    let child = children[c];
    chrome.contextMenus.create(child);
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log(tab);
    console.log(info);
    console.log(tab.id);
    if (tab) {
        chrome.tabs.executeScript(tab.id, {file: "scripts/linkChecker/linkChecker.js"});
    }
});