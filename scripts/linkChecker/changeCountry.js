


async function getWrapper(url, element) {
    var wrapper = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/hal+json;q=.9,text/html;q=.5'
        },
        "bb-app": "wrapper-app, 1.1.1",
        "bb-csrf": "11204915-1133-11ea-b944-c81f66d1a5ec, 11204915-1133-11ea-b944-c81f66d1a5ec, 11204915-1133-11ea-b944-c81f66d1a5ec, 11204915-1133-11ea-b944-c81f66d1a5ec"
    });
    return wrapper;
}
getWrapper("https://store.bodybuilding.com/wrapper");




async function getcsrf(url, element) {
    var csrf = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/hal+json;charset=UTF-8'
        },
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrer: 'no-referrer'
    });
    return csrf;
}
getcsrf("https://store.bodybuilding.com/csrf");


function changeCountry() {
    var country = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(function (response) {
        console.log(response);
    }).catch(function (err) {
        console.log(err);
    });
}
changeCountry("https://cart.bodybuilding.com/rest/model/bodybuilding/global/changeCountryActor/changeCountry?changeLocale=en-US&CSRF=30fa2349864c4162b923f6d7a8290dfc")



//https://uk.bodybuilding.com/store/listing.htm?cb1574872861826=GB&cb1574872963772=GB