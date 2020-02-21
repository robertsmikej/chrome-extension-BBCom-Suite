var promoData = {},
    jiraFunctions = {
        addToObj: function (key, cleanData) {
            promoData[key] = cleanData;
        },
        alreadyClicked: function (node) {
            var i,
                allChildren = node.getElementsByTagName('*');
            for (var i = 0; i < allChildren.length; i++) {
                var child = allChildren[i];
                if (child.classList.contains("promo__clicked")) {
                    return true;
                }
            }
        },
        createSKUCell: function (data, row) {
            var cell = document.createElement("td");
            if (typeof data === "string") {
                cell.innerHTML = data.split(",")[0];
            } else {
                cell.innerHTML = "Nothing in field";
                cell.style.color = "red";
            }
            cell.classList.add("confluenceTd", "promo__clicked");
            row.appendChild(cell);
        },
        nextUntil: function (titleEl, tableClass) {
            var tables = [];
            elem = titleEl.nextElementSibling;
            while (elem) {
                if (elem.classList.contains(tableClass)) {
                    tables.push(elem);
                } else {
                    break; 
                }
                elem = elem.nextElementSibling;
            }
            return tables;
        },
        parseURLs: function (arr) {
            var i;
            for (i = 0; i < arr.length; i += 1) { 
                var table = arr[i];
                var tableRows = table.getElementsByTagName("tr"),
                    r;
                for (r = 0; r < tableRows.length; r += 1) {
                    var row = tableRows[r];
                    if (row.getElementsByTagName("td").length >= 2) {
                        var name = row.getElementsByTagName("td")[0].textContent + " - " + row.getElementsByTagName("td")[1].textContent,
                            ticketNum = row.getElementsByTagName("td")[1].getElementsByTagName("a")[0].href.split("PROMO-")[1];
                        jiraFunctions.getTicketData(ticketNum, name, row);
                    }
                }
            }
        },
        getTicketData: function (promoID, key, row) {
            $.ajax({
                type: "GET",
                url: "/plugins/servlet/applinks/proxy?appId=7d23efe5-9dcd-396b-882a-76a078219a86&path=https://jira/rest/api/2/issue/PROMO-" + promoID,
                processData: false,
                async: true,
                dataType: "json",
                headers: {
                  "Content-Type" : "application/json"
                },
                contentType: "application/json",
                success: function (datas) {
                    var ob = datas.fields;
                    var propNames = Object.getOwnPropertyNames(ob);
                    var cleanData = {};
                    for (var i = 0; i < propNames.length; i++) {
                        var propName = propNames[i];
                        var name = ob[propName];
                        if (!!name) {
                            cleanData[propName] = name;
                        }
                    }
                    jiraFunctions.createSKUCell(cleanData.customfield_16495, row);
                    jiraFunctions.addToObj(key, cleanData);
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
    };
(function () {
    if (window.location.host === "confluence") {
        var i,
            tables = document.getElementsByClassName("table-wrap");
        for (i = 0; i < tables.length; i += 1) {
            try {
                if (tables[i].previousSibling.tagName !== "DIV") {
                    tables[i].previousSibling.classList.add('promo__click');
                }
            } catch (e) {
                console.group();
                console.error("Possible Formatting Error With Table Below This Line:");
                console.error(tables[i]);
                console.error("If Tables are Formatted Correctly, Please See Mike Roberts in Merchandising for Assistance");
                console.groupEnd();
            }
        }
        document.addEventListener('click', function (event) {
            var parent = event.target.closest('.promo__click');
            if (parent) {
                if (!parent.matches('.promo__click')) {
                    return;
                } else {
                    if (jiraFunctions.alreadyClicked(parent.nextSibling)) {
                        return;
                    } else {
                        jiraFunctions.parseURLs(jiraFunctions.nextUntil(parent, "table-wrap"));
                    }
                }
                event.preventDefault();
            } 
        }, false);
    }
})();