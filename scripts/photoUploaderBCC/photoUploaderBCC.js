if (window.location.href.indexOf("bbca/editor/property/image") > -1) {
    
    function textNodesUnder(el) {
        var n,
            a = [],
            walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        while (n = walk.nextNode()) {
            a.push(n);
        }
        return a;
    }
    var i, r,
        nodes = textNodesUnder(document.querySelector('body')),
        textArray = ["Project Name", "Author", "Add images in", "Add Image(s)", "button", "Return to", "When finished adding images", "to upload the images to"];
//    $('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
    $.get(chrome.extension.getURL('scripts/photoUploaderBCC/photoUploaderBCC-css.html'), function (data) { //INJECT CSS FILE
        $(data).appendTo('body');
    });
    $('br').remove(); //REMOVE SILLY LINE BREAKS
    $("h1").nextUntil("h4").remove(); //REMOVE INPUTS AT TOP OF PAGE

    for (i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        for (r = 0; r < textArray.length; r++) {
            if (node.textContent.indexOf(textArray[r]) > -1) {
                node.parentNode.removeChild(node);
                textArray.splice(r, 1);
                break;
            }
        }
    }
    
    $.get(chrome.extension.getURL('scripts/photoUploaderBCC/photoUploaderBCC-css.html'), function (data) {
//        var frames = window.frames;
//        for (var i = 0; i < frames.length; i++) { 
//            console.log(data);
//            frames[i].document.appendChild(data);
//        }
//        var doc = document.getElementById('iFrame').contentWindow.document;
//        doc.open();
//        doc.write(data);
//        doc.close();
        $("iFrame").contents().find('html').html("<style>iframe {min-height: 90vh !important;}#assetBrowserContentBody {height: 90vh !important;}</style>" + $("iFrame").contents().find('html'));
//        var $iframe = $('#iFrame');
//        $iframe.ready(function() {
//            $iframe.contents().find("head").append(data);
//        });
    });
//    var cssLink = document.createElement("link");
//        cssLink.href = "style.css"; 
//        cssLink.rel = "stylesheet"; 
//        cssLink.type = "text/css"; 
//        frames['iframe1'].document.body.appendChild(cssLink);
    
}



