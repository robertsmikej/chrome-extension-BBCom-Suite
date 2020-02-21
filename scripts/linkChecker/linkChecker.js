var count = 1;
function changeLink(element) {
    element.style.backgroundColor = "#428bca";
    element.style.color = "white";
}

function getlinkdata(url, element) {
    fetch(url).then(function (response) {
        document.getElementsByClassName("extension__status__currentlinknum")[0].innerHTML = count;
        count++;
        if (response.status === 404) {
            changeLink(element);
            addBadLink(element.textContent, url);
            return true;
        }
    }).catch(function (err) {
        console.log(err);
    });
}

function looplinks(links, devenv, devnum) {
    var endnum = devenv ? devenv : links.length;
    for (let i = 0; i < endnum; i++) {
        var element = links[i];
        if (element.nodeName == "A") {
            getlinkdata(element.getAttribute("href"), element);
        }
    }
}

function createInitial() {
    var container = document.querySelector("[data-bb-zone1='page-content']");
    var links = container.getElementsByTagName("a");
    var statusdiv = document.createElement("div");
    statusdiv.classList.add("extension__status__div");
    statusdiv.style.width = "100%";
    statusdiv.style.display = "flex";
    statusdiv.style.flexDirection = "column";
    statusdiv.style.justifyContent = "center";
    statusdiv.style.alignContent = "center";
    statusdiv.style.alignItems = "center";
    statusdiv.style.padding = "40px 20px";
    var statuspara = document.createElement("para");
    statuspara.classList.add("extension__status__para");
    statuspara.style.fontSize = "18px";
    statuspara.innerHTML = "Checking Bad Links: <span class='extension__status__currentlinknum'>0</span> of <span class='extension__status__linkstotal'>" + links.length + "</span> links";
    statusdiv.appendChild(statuspara);
    var statusResultsDiv = document.createElement("div");
    statusResultsDiv.classList.add("extension__status__results__container");
    statusdiv.appendChild(statusResultsDiv);
    container.insertBefore(statusdiv, container.firstChild);
}

function initLinks() {
    var container = document.getElementsByTagName("main")[0];
    var links = container.getElementsByTagName("a");
    var devenv = false;
    var devnum = 20;
    createInitial();
    looplinks(links, devenv, devnum);   
}

function addBadLink(name, url) {
    var badcontainer = document.querySelector(".extension__status__results__container");
    badcontainer.style.marginTop = "10px";
    var newbaddiv = document.createElement("div");
    newbaddiv.classList.add("extension__new__badlink__div");
    newbaddiv.style.display = "flex";
    newbaddiv.style.flexDirection = "row";
    newbaddiv.style.justifyContent = "flex-start";
    newbaddiv.style.padding = "2px";
    var newbadnamediv = document.createElement("div");
    newbadnamediv.classList.add("extension__new__badlink__namediv");
    newbadnamediv.style.minWidth = "170px";
    var newbadname = document.createElement("p");
    newbadname.classList.add("extension__new__bad__para");
    newbadname.textContent = name;
    newbadname.style.margin = "0";
    newbadnamediv.appendChild(newbadname);
    var newbadlinkdiv = document.createElement("div");
    newbadlinkdiv.classList.add("extension__new__badlink__namediv");
    var newbadlink = document.createElement("a");
    newbadlink.classList.add("extension__new__bad__link");
    newbadlink.textContent = url;
    newbadlink.setAttribute("href", url);
    newbadlink.style.margin = "0";
    newbadlink.setAttribute("target", "_blank");
    newbadlinkdiv.appendChild(newbadlink);
    newbaddiv.appendChild(newbadnamediv);
    newbaddiv.appendChild(newbadlinkdiv);
    badcontainer.appendChild(newbaddiv);
}

console.clear();
console.log("Checking Bad Links");

initLinks();