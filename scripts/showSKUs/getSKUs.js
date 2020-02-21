let skuFuncs = {
    buildCell: function (appen, skuId, flavorSizeName, type, servings, group) {
        let dropdown = document.getElementsByClassName('sku__dropdown')[0];
        let newCell = document.createElement('div');
        let sup = document.createElement('div');
        let main = document.createElement('div');
        newCell.classList.add('sku__cell', 'bb-dropdown__options-mask', 'bb-dropdown__options-mask--show', 'sku-chooser__label');
        newCell.style.padding = "0 15px";
        newCell.style.flexDirection = "column";
        newCell.style.justifyContent = "center";
        sup.classList.add('sku-chooser__label-super', 'sku__super', 'sku__super--copy');
        main.classList.add('sku-chooser__label-value', 'sku__label', 'sku__label--copy');
        sup.innerHTML = skuId;
        newCell.appendChild(sup);
        newCell.appendChild(main);
        if (appen) {
            main.innerHTML = group + " - " + flavorSizeName;
            dropdown.appendChild(newCell);
        } else {
            main.innerHTML = flavorSizeName;
            dropdown.prepend(newCell);
        }
    },
    buildDropDown: function (length) {
        let drop = document.createElement('div');
        drop.classList.add('sku-chooser__chooser-col', 'sku-picker');
        drop.style.marginBottom = "20px";        
        document.querySelector('.row').querySelectorAll('.col-sm-4')[1].firstChild.before(drop);
        document.querySelector('.sku-picker').innerHTML = '<style>.sku__cell:hover {background-color: #F9F9F9; } .sku__dropdown {display: none;}.skus__show {display: block !important;}</style><div role="listbox" class="bb-dropdown-wrapper"><div class="bb-dropdown"><div class="bb-dropdown__arrow sku__arrow"></div><div class="bb-dropdown__label bb-dropdown__label--custom"><bb-dropdown-label class="sku-chooser__label"><div><div class="sku-chooser__label-super sku__super sku__super--change">' + length + ' SKUs</div><div class="sku-chooser__label-value sku__value sku__value--change">' + 'SKU Chooser' + 
        '</div></div></bb-dropdown-label></div></div><div class="sku__dropdown"></div>';
        let down = document.getElementsByClassName('sku__dropdown')[0];
        down.style.boxShadow = "0 3px 12px -2px rgba(0,0,0,.15)";
        down.style.background = "#FFF";
        down.style.zIndex = "100000";
        down.style.position = "absolute";
        down.style.width = "100%";
        down.style.padding = "6px 0";
    },
    copyNum: function (num) {
        document.getElementById('extensionInput').value = num;
        document.getElementById('extensionInput').select();
        document.execCommand("copy");
        document.getElementById('extensionInput').value = "";
        document.getElementsByClassName('sku__super--change')[0].innerHTML = num;
        document.getElementsByClassName('sku__value--change')[0].innerHTML = "Copied";
        document.getElementsByClassName('sku__value--change')[0].style.color = "#00aeef";
    },
    clicks: function () {
        document.addEventListener('click', function (event) {
            let down = document.getElementsByClassName('sku__dropdown')[0];
            if (event.target.matches('.sku__arrow') || event.target.matches('.sku__value') || event.target.matches('.sku__super') || event.target.matches('.sku__label')) {
                down.classList.toggle('skus__show');
                if (event.target.matches('.sku__super--copy') || event.target.matches('.sku__label--copy')) {
                    skuFuncs.copyNum(event.target.parentElement.querySelector('.sku__super--copy').textContent);
                    skuFuncs.photoSizes(event.target.parentElement.querySelector('.sku__super--copy').textContent);
                } else {
                    document.getElementsByClassName('sku__super--change')[0].innerHTML = (document.getElementsByClassName('sku__label').length - 1) + " SKUs";
                    document.getElementsByClassName('sku__value--change')[0].innerHTML = "SKU Chooser";
                    document.getElementsByClassName('sku__value--change')[0].style.color = "inherit";
                }
            } else if (event.target.matches('.js__expand__img__container') || event.target.matches('.js__expand__img') || event.target.matches('.expand__header')) {
                document.getElementsByClassName('expand__imgs__container')[0].classList.add('skus__show');
            } else {
                down.classList.remove('skus__show');
                document.getElementsByClassName('expand__imgs__container')[0].classList.remove('skus__show');
                return;
            }
        }, false);
    },
    getSku: function (skus) {
        let topSelector = document.getElementsByClassName('sku-chooser__label-value')[0];
        let bottomSelector = document.getElementsByClassName('sku-chooser__label-value')[1];
        skus.forEach(function (sku, index) {
            let skuId = sku.skuId;
            let flavorSizeName = sku.name;
            let type = sku.type;
            let servings = sku.servings;
            let group = sku.groupName; // 30 Servings, etc.
            skuFuncs.buildCell(true, skuId, flavorSizeName, type, servings, group);            
        });
    },
    init: function () {
        let require = window.require;
        if (require && typeof require === 'function' && require('bb/product-detail/module-info')) {
            skuFuncs.buildDropDown(require('bb/product-detail/module-info').skus.length);
            skuFuncs.getSku(require('bb/product-detail/module-info').skus);
            skuFuncs.makeInput();
            skuFuncs.photoInit(require('bb/product-detail/module-info').skus);
            skuFuncs.clicks();
        } 
        if (require && typeof require === 'function' && require('bb/product-detail/module-info').productId) {
            skuFuncs.setProductID(require('bb/product-detail/module-info').productId);
        }
    },
    makeInput: function () {
        let input = document.createElement('INPUT');
        input.setAttribute("type", "text");
        input.id = "extensionInput";
        input.style.position = "absolute";
        input.style.top = "-1000%";
        input.style.left = "-1000%";
        document.body.appendChild(input);
    },
    photoInit: function (skus) {
        const sku = skus[0];
        const imgContainer = document.getElementsByClassName('expand__img__container')[0];
        const imgCells = document.getElementsByClassName('expand__img__container')[0].getElementsByClassName('expand__img__cell');
        document.getElementsByClassName('expand__header')[0].textContent = "SKU: " + sku.skuId;
        imgCells[0].getElementsByTagName('img')[0].src = sku.smallImageURL;
        imgCells[1].getElementsByTagName('img')[0].src = sku.mediumImageURL;
        imgCells[2].getElementsByTagName('img')[0].src = sku.largeImageURL;
        imgCells[3].getElementsByTagName('img')[0].src = "https://store.bbcomcdn.com/store/skuimage/sku_" + sku.skuId + "/image_sku" + sku.skuId + "_largeImage.png";
    },
    photoSizes: function (sku) {
        const imgCells = document.getElementsByClassName('expand__img__container')[0].getElementsByClassName('expand__img__cell');
        document.getElementsByClassName('expand__header')[0].textContent = "SKU: " + sku;
        imgCells[0].getElementsByTagName('img')[0].src = "https://store.bbcomcdn.com/images/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage_X_70_white.jpg";
        imgCells[1].getElementsByTagName('img')[0].src = "https://store.bbcomcdn.com/images/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage_X_130_white.jpg";
        imgCells[2].getElementsByTagName('img')[0].src = "https://store.bbcomcdn.com/images/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage_X_450_white.jpg";
        imgCells[3].getElementsByTagName('img')[0].src = "https://store.bbcomcdn.com/store/skuimage/sku_" + sku + "/image_sku" + sku + "_largeImage.png";
    },
    setProductID: function (prodID) {
        skuFuncs.buildCell(false, prodID, "Product ID Number");
    }
}
setTimeout(function () {    
    skuFuncs.init();
}, 1600);