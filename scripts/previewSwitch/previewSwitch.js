var current = window.location.href,
    host = window.location.hostname,
    store = window.location.pathname,
    preview = "preview-store.body.local",
    live = "bodybuilding.com";
(function () {
    if (host.indexOf(live) >= 0) {
        window.location.href = "http://" + preview + store;
    } else {
        window.location.href = "https://" + live + store;
    }
}());