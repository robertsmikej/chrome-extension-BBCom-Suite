function injectScript(file, node) {
    let th = document.getElementsByTagName(node)[0];
    let s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
function expansionImage() {
    const imgURL = chrome.extension.getURL('imgs/expand.png');
    const div = document.createElement("div");
    const img = document.createElement("img");
    const imgInner = document.createElement("div");
    imgInner.classList.add("expand__imgs__container");
    imgInner.style.maxWidth = "80%";
    imgInner.style.display = "none";
    imgInner.style.width = "800px";
    imgInner.style.border = "2px solid #232323";
    imgInner.style.borderRadius = "2px";
    imgInner.style.position = "absolute";
    imgInner.style.left = "50%";
    imgInner.style.top = "50%";
    imgInner.style.transform = "translate(-50%, -50%)";
    imgInner.style.background = "#FFF";
    imgInner.style.textAlign = "center";
    imgInner.style.padding = "20px";
    imgInner.style.color = "232323";
    imgInner.style.zIndex = "101";
    imgInner.style.minHeight = "230px";
    div.classList.add('js__expand__img__container', 'expand__imgs__button__container');
    img.classList.add('js__expand__img', 'expand__imgs');
    img.src = imgURL;
    div.style.position = "absolute";
    div.style.bottom = "0";
    div.style.right = "0";
    div.style.zIndex = "100";
    div.style.cursor = "pointer";
    img.style.maxWidth = "20px";
    div.appendChild(img);
    
    const expandHeader = document.createElement("h3");
    const imgOverallContaner = document.createElement("div");
    imgOverallContaner.classList.add("expand__img__container");
    imgOverallContaner.style.display = "flex";
    imgOverallContaner.style.flexDirection = "row";
    imgOverallContaner.style.flexWrap = "nowrap";
    expandHeader.classList.add("expand__header");
    expandHeader.textContent = "SKU: ";
    imgInner.appendChild(expandHeader);
    
    let i;
    let imgTextArr = [
        "70px Wide - JPG",
        "130px Wide - JPG",
        "450px Wide - JPG",
        "1000px Wide - PNG"
    ];
    for (i = 0; i < 4; i++) { 
        let imgContainer = document.createElement("div");
        let imgHeader = document.createElement("p");
        let img = document.createElement("img");
        imgContainer.classList.add("expand__img__cell");
        imgContainer.style.flex = "1 1 25%";
        imgHeader.classList.add("expand__img__para");
        img.classList.add("expand__img");
        img.style.maxWidth = "100px";
        img.style.width = "90%";
        img.style.maxHeight = "90%";
        imgHeader.textContent = imgTextArr[i];
        imgHeader.style.textAlign = "center";
        imgHeader.style.margin = "10px auto";
        imgContainer.appendChild(imgHeader);
        imgContainer.appendChild(img);
        imgOverallContaner.appendChild(imgContainer);
    }
    imgInner.appendChild(imgOverallContaner);
    document.querySelector('.Product__img--wrapper').appendChild(div);
    document.body.appendChild(imgInner);
}

if (window.location.href.indexOf("preview-store.body.local") > -1 && document.getElementsByClassName("flava-flav")) {
    injectScript(chrome.extension.getURL('scripts/showSKUs/getSKUsPreview.js'), 'body');
} else if (window.location.href.indexOf("bodybuilding.com") > -1) {
    if (document.querySelector('.Product') || document.getElementById('right-content-prod')) {
        expansionImage();
        injectScript(chrome.extension.getURL('scripts/showSKUs/getSKUs.js'), 'body');
    }
}