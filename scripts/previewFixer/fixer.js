if (window.location.href.indexOf("http://preview-store.body.local/store/") > -1) {
    $.get(chrome.extension.getURL('scripts/previewFixer/fixer-css.html'), function (data) {
        $(data).appendTo('body');
    });
    $('<link href="https://artifacts.bbcomcdn.com/product-detail-app/7.0.0/legacy.min.css" rel="stylesheet" type="text/css"><link href="https://store.bbcomcdn.com/stylesheets/min/product-pages.css?ver=20171005.1549-prod" rel="stylesheet" type="text/css"><link href="https://store.bbcomcdn.com/store/deploy/productMedia/productGuideCSS_blankCss1/blankCss1_guide_stylesheet.css" rel="stylesheet" type="text/css"><link rel=stylesheet href="//artifacts.bbcomcdn.com/product-detail-app/11.3.0/product-detail-app.min.css">').prependTo($('head'));
    $('#vendor-content').wrap("<div class='VendorBlock'></div>");
    $('#leftContentProd').find('br').first().remove();
    $(document).ready(function() {
        $('#leftContentProd img').each(function () {
            try {
                $(this).attr('src', $(this).attr('src').replace('https', 'http'));
            } catch (e) {
                console.log("Image Couldn't Be Changed With Extension");
            }
        });
        $('#vendor-content').find('*').each(function () {
            try {
                var backimg = $(this).css('background-image'),
                    backimg2 = $(this).css('background');
                if (backimg !== 'none') {
                    $(this).css('background-image', backimg.replace("url(\"https", "url(\"http").replace("url('https", "url(\'http"));
                }
                if (backimg2 !== 'none') {
                    $(this).css('background-image', backimg2.replace("url(\"https", "url(\"http").replace("url('https", "url(\'http"));
                }
            } catch (e) {
                console.log("Background Image Couldn't Be Changed With Extension");
            }
        });
        $('.skuCopy').on('click', function (e) {
            var sku = e.currentTarget.querySelector('.skuAdd').textContent.replace(' - SKU Copied','');
            var skuImg = document.querySelector('.bb-image-viewer').querySelector('.photo');
            var newURL = "http://preview-bbcomcdn-store.body.local/images/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage_X_130_white.jpg";
            skuImg.src = newURL;
            skuImg.parentElement.setAttribute('href', newURL.replace("_130_", "_450_"));
            console.log(sku);
        });
        var modalOuter = document.createElement('div');
        var modalInner = document.createElement('div');
        var modalImg = document.createElement('img');
        modalOuter.classList.add('preview__modal__outer');
        modalInner.classList.add('preview__modal__inner');
        modalImg.classList.add('preview__modal__img');
        modalInner.appendChild(modalImg);
        document.querySelector('.Wr__body').appendChild(modalInner);
        document.querySelector('.Wr__body').appendChild(modalOuter);
        $('.bb-image-viewer').on('click', function (e) {
            e.preventDefault();
            var img = document.querySelector('.preview__modal__img');
            var imgSrc = document.querySelector('.bb-image-viewer').getAttribute('href');
            img.src = imgSrc;
            $('.preview__modal__outer').fadeIn(250);
            $('.preview__modal__inner').delay(50).fadeIn(250);
        });
        $('.preview__modal__outer, .preview__modal__inner').on('click', function (e) {
            $('.preview__modal__inner').fadeOut(250);
            $('.preview__modal__outer').delay(50).fadeOut(250);
        });
    });
}