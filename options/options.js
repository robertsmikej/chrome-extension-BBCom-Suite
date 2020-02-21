// Saves options to chrome.storage.local.
function save_options() {
    //DEFINE TEAM BOX CHECKED
    var previewToLiveChecked = document.getElementById('previewToLiveChecked').checked,
        getSKUsChecked = document.getElementById('addSkusLiveChecked').checked;
    chrome.storage.local.set({
        previewToLiveChecked : previewToLiveChecked,
        getSKUsChecked : getSKUsChecked
    }, function () {
//CHECKS TO SEE WHAT CHECKBOXES ARE CHECKED AND STORES THAT
        if (previewToLiveChecked) {
            localStorage.setItem('previewToLiveChecked', "true");
        } else {
            localStorage.setItem('previewToLiveChecked', "false");
        }
        var status = document.getElementById('status');
        status.style.display = "block";
        setTimeout(function () {
            window.close();
        }, 1500);
        
    });
}

// Restores checkbox state and text boxes using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.local.get(null, function (result) {
        document.getElementById("newProductSelection").selectedIndex = result.newProductCellColorUser;
        if (result.jiraPreviewLiveChecked) {
            document.getElementById('jiraPreviewLiveChecked').checked = true;
        }
    });
}
document.addEventListener('DOMContentLoaded', restore_options);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('save').addEventListener('click', save_options);
});

//SENDS STORAGE TO OTHER SCRIPTS
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        sendResponse({data: localStorage});
    } else {
        sendResponse({});
    }
});

//REVEALS DIV FOR EXPLAINATIONS OF OPTIONS
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('JIRADatesWhatIsLink').addEventListener("click", function () {
        document.getElementById('JIRADatesWhatIs').style.display = "block";
    });
    document.getElementById('hideJiraFieldsWhatIsLink').addEventListener("click", function () {
        document.getElementById('hideJiraFieldsWhatIs').style.display = "block";
        document.getElementById('hideJiraFieldsContentTeamChecked').style.display = "none";
        document.getElementById('hideJiraFieldsCatalogTeamChecked').style.display = "none";
        document.getElementById('imageFilePathChecked').style.display = "none";
        document.getElementById('addSkusLiveChecked').style.display = "none";
    });
});

//HIDES DIV FOR EXPLAINATIONS OF OPTIONS
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('close').addEventListener("click", function () {
        document.getElementById('JIRADatesWhatIs').style.display = "none";
    });
    document.getElementById('close5').addEventListener("click", function () {
        document.getElementById('hideJiraFieldsWhatIs').style.display = "none";
        document.getElementById('hideJiraFieldsContentTeamChecked').style.display = "block";
        document.getElementById('hideJiraFieldsCatalogTeamChecked').style.display = "block";
        document.getElementById('imageFilePathChecked').style.display = "block";
        document.getElementById('addSkusLiveChecked').style.display = "block";
    });
});

