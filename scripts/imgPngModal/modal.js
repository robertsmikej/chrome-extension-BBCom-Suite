var clickedData = {
    newGroupClicked: false
};

function setModalData(sku) {
    var clickedData = {
        sku: sku,
        detail: document.getElementsByClassName("Product__name")[0].textContent,
        newGroupClicked : true,
        jpg70imgurl: "https://store.bbcomcdn.com/images/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage_X_70_white.jpg",
        jpg130imgurl: "https://store.bbcomcdn.com/images/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage_X_130_white.jpg",
        jpg450imgurl: "https://store.bbcomcdn.com/images/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage_X_450_white.jpg",
        png1000imgurl: "https://store.bbcomcdn.com/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage.png"
    };
    return clickedData;
}
function setModal(data) {
    var modal = document.getElementsByClassName("extensionModal")[0];
    modal.querySelector(".extensionImg0").src = data.jpg70imgurl;
    modal.querySelector(".extensionImg1").src = data.jpg130imgurl;
    modal.querySelector(".extensionImg2").src = data.jpg450imgurl;
    modal.querySelector(".extensionImg3").src = data.png1000imgurl;
    modal.querySelector(".extensionGrouping").textContent = data.detail;
    modal.querySelector(".extensionSKU").textContent = data.sku;
}

function showModal() {
    document.getElementsByClassName("extensionModalOverlay")[0].style.display = "block";
    document.getElementsByClassName("extensionModal")[0].style.display = "block";
}
function hideModal() {
    document.getElementsByClassName("extensionModal")[0].style.display = "none";
    document.getElementsByClassName("extensionModalOverlay")[0].style.display = "none";
}

if (document.querySelector("#main").querySelector(".Product")) {    
    fetch(chrome.extension.getURL("scripts/imgPngModal/modal.html"))
        .then(response => response.text())
        .then(function (data) {
            document.body.innerHTML += data;
        });
    document.addEventListener('click', function (event) {
        if (event.target.matches('.Product__img')) {
            event.preventDefault();
            event.stopPropagation();
            var sku = event.target.getAttribute('src').replace("https://store.bbcomcdn.com/images/store/skuimage/sku_", "").replace("/image_sku", "-").replace("_largeImage_X_450_white.jpg", "").split("-"[0]);
            var data = setModalData(sku[0]);
            setModal(data);
            showModal();
        }
        if (event.target.matches('.extensionModalOverlay')) {
            event.preventDefault();
            event.stopPropagation();
            hideModal();
        }
        return;
    }, false);
}