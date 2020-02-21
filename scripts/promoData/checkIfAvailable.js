



(function () {
    var productSKU = "MT4610759",
//    searchURL = "https://search.bodybuilding.com/slp/full?context=store&query=" + productSKU;
    searchURL = "https://www.bodybuilding.com/store/muscletech/amino-build-next-gen-ripped.html";
//    searchURL = "https://www.bodybuilding.com/store/catalog/product/product-vendor.jsp?productId=prod4340112";
//    if (window.location.host === "confluence") {
        $.ajax({
            type: "GET",
            url: searchURL,
            processData: false,
            async: true,
            dataType: "json",
            headers: { 'Accept': 'application/hal+json', 'BB-App': 'marketing, 1.0.0' },
            contentType: "application/json",
            success: function (datas) {
                console.log(datas);
            }
        });
//    }
})();