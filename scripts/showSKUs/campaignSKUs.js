let skuFuncs = {
    // checkArr: function(arr) {
    //     let dupeArray = [];
    //     for(var i = 0; i <= arr.length; i++) {
    //         for(var j = i; j <= arr.length; j++) {
    //             if(i != j && arr[i] == arr[j]) {
    //                 var sku = arr[i];
    //                 dupeArray.push(sku);
    //             }
    //         }
    //     }
    //     return dupeArray;
    // },
    getData: function () {
        var pageurl = window.location.href;
        $.ajax({
            type: "GET",
            url: pageurl,
            processData: false,
            async: true,
            dataType: "json",
            headers: {'Accept': 'application/hal+json', 'BB-App': 'marketing, 1.0.0'},
            contentType: "application/json",
            success: function (datas) {
                skuFuncs.init(datas);
            }
        });
    },
    init: function (data) {
        var datas = data["_embedded"].item;
        if (document.querySelector('.product')) {
            let products = document.getElementsByClassName('product');
            let product;
            let skuArray = [];
            let promoArray = [];
            for (product in products) {
                if (products[product].nodeName === "DIV") {
                    let skupara = document.createElement('p');
                    let p = products[product];
                    let sku = datas[product]["_links"]["bb:target"].href.split("skuId=")[1];
                    skuArray.push(sku);
                    skupara.style.margin = "0";
                    skupara.style.padding = "0 5px 3px";
                    skupara.style.position = "absolute";
                    skupara.style.bottom = "0";
                    skupara.style.right = "0";
                    skupara.style.fontSize = "12px";
                    skupara.style.lineHeight = "12px";
                    skupara.classList.add("extension__added__sku");
                    skupara.innerHTML = sku;
                    p.appendChild(skupara);
                    if (!p.querySelector('.vio-text')) {
                        let promopara = document.createElement('p');
                        promoArray.push(sku);
                        promopara.style.margin = "0";
                        promopara.style.padding = "2px 4px";
                        promopara.style.position = "absolute";
                        promopara.style.top = "6px";
                        promopara.style.left = "6px";
                        promopara.style.zIndex = "100";
                        promopara.style.fontSize = "10px";
                        promopara.style.lineHeight = "10px";
                        promopara.style.backgroundColor = "#00aeef";
                        promopara.style.color = "#FFF";
                        promopara.classList.add("extension__added__promo__para");
                        promopara.innerHTML = "No Promo";
                        p.querySelector(".top10__product-inner").prepend(promopara);
                    }
                }
            }
            // let contentArea = document.querySelector('#js-bbcom-app');
            // let dupes = skuFuncs.checkArr(skuArray);
            // let deets = document.createElement("div");
            // let deetsOpener = document.createElement("div");
            // deets.classList.add("extension__added__div", "js__details__div")
            // deets.style.position = "absolute";
            // deets.style.top = "20%";
            // deets.style.left = "-194px";
            // deets.style.width = "200px";
            // deets.style.overflow = "hidden";
            // deets.style.transition = "all .5s";
            // deets.style.padding = "10px";
            // deets.style.minHeight = "80vh";
            // deets.style.zIndex = "10000";
            // deets.style.backgroundColor = "#fff";
            // deets.style.border = "2px solid #00aeef";
            // deets.style.borderRight = "none";
            // deets.style.borderLeft = "none";
            // deetsOpener.style.width = "6px";
            // deetsOpener.style.backgroundColor = "#00aeef";
            // deetsOpener.style.position = "absolute";
            // deetsOpener.style.right = "0px";
            // deetsOpener.style.top = "0";
            // deetsOpener.style.cursor = "pointer";
            // deetsOpener.style.height = "100%";
            // deetsOpener.classList.add("js__details__extension__opener");
            // deets.prepend(deetsOpener);
            // //CHECK FOR DUPLICATES ON PAGE
            // if (dupes.length > 0) {
            //     let dupePara = document.createElement("p");
            //     dupePara.classList.add("extension__added__para");
            //     dupePara.style.margin = "5px";
            //     dupePara.style.fontWeight = "600";
            //     dupePara.innerHTML = "Duplicates on page:";
            //     deets.appendChild(dupePara);
            //     var duplicates = skuArray.reduce(function(acc, el, i, arr) {
            //         if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
            //     }, []);
            //     for (let i = 0; i < duplicates.length; i += 1) { 
            //         let sku = duplicates[i],
            //             dupPara = document.createElement("p");
            //         dupPara.classList.add("extension__added__para");
            //         dupPara.innerHTML = sku;
            //         dupPara.style.margin = "1px 10px";
            //         deets.appendChild(dupPara);
            //     }
            // }
            // //CHECK FOR PRODUCTS WITH NO PROMOS
            // if (promoArray.length > 0) {
            //     let promoPara = document.createElement("p");
            //     promoPara.classList.add("extension__added__para");
            //     promoPara.style.margin = "5px";
            //     promoPara.style.fontWeight = "600";
            //     promoPara.innerHTML = "SKU's With No Promo: ";
            //     deets.appendChild(promoPara);
            //     let unique = [...new Set(promoArray)];
            //     for (let i = 0; i < unique.length; i += 1) { 
            //         let nopromo = unique[i],
            //             proPara = document.createElement("p");
            //         proPara.classList.add("extension__added__para");
            //         proPara.innerHTML = nopromo;
            //         proPara.style.margin = "1px 10px";
            //         deets.appendChild(proPara);
            //     }
            // }
            // contentArea.prepend(deets);
            // document.addEventListener('click', function (event) {
            //     if (!event.target.matches('.js__details__extension__opener')) {
            //         return;
            //     }
            //     event.preventDefault();
            //     if (event.target.parentElement.style.left !== "0px") {
            //         event.target.parentElement.style.left = "0";
            //     } else {
            //         event.target.parentElement.style.left = "-194px";
            //     }
            // }, false);
            // var resizeTimer;
            // $(window).on('resize', function(e) {
            //     clearTimeout(resizeTimer);
            //     resizeTimer = setTimeout(function() {
            //         if (window.innerWidth < 900) {
            //             document.getElementsByClassName('js__details__div')[0].style.display = "none";
            //         } else {
            //             document.getElementsByClassName('js__details__div')[0].style.display = "flex";
            //         }
            //     }, 250);
            // });
        }
    }
};
setTimeout(function () {
    if (window.location.href.indexOf("marketing.bodybuilding.com") > -1) {
        skuFuncs.getData();
    }
}, 1200);