//ADD BBCOM EXTENSION CSS TO EVERY PAGE
$.get(chrome.extension.getURL('scripts/addCSS/bbExtension-css.html'), function (data) {
    $(data).appendTo('body');
});