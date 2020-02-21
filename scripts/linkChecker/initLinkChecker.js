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
createInitial();