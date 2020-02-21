var skuFuncs = {
    init: function () {
        let flavorTables = document.getElementsByClassName('flava-flav');
        let i;
        for (i = 0; i < flavorTables.length; i += 1) { 
            let table = flavorTables[i];
            let buttons = table.getElementsByClassName('order-button');
            let t;
            for (t = 0; t < buttons.length; t += 1) { 
                let button = buttons[t];
                console.log(button);
                if (button.getElementsByTagName('form').length >= 1) {
                    let sku = button.getElementsByTagName('form')[0].id.split("-")[0];
                    let cell = button.parentElement;
                    cell.style.display = "flex";
                    cell.style.width = "100%";
                    cell.style.height = "auto";
                    cell.style.margin = "10px 0";
                    cell.style.cursor = "pointer";
                    cell.classList.add("sku__click");
                    let flavorArea = cell.querySelector('.flavor');
                    flavorArea.innerHTML = flavorArea.innerHTML + "<h5 class='js__sku'>" + sku + "</h5>";
                }
            }
        }
        if (document.querySelector(".bb-image-viewer")) {
            var image = document.querySelector(".bb-image-viewer").querySelector(".photo");
            document.addEventListener('click', function (event) {
                if (event.target.parentElement.parentElement.matches('.sku__click')) {
                    console.log('Photo');
                    event.preventDefault();
                    var sku = event.target.parentElement.querySelector(".js__sku").textContent;
                    image.src = "http://preview-bbcomcdn-store.body.local/images/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage_X_130_white.jpg";
                } else {
                    return;
                }
            });
        }
    }
};
setTimeout(function () {    
    skuFuncs.init();
}, 1000);