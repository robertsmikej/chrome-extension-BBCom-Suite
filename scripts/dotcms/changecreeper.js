// var dotcms = {
//     changeCreeper: function () {
//         console.log('creeeeee');
//         if (document.querySelectorAll(".fieldWrapper").length > 2) {
//             console.log(document.querySelector(".fieldWrapper")[3]);
//             console.log(document.querySelector(".fieldWrapper")[3].children[1]);
//             console.log(document.querySelector(".fieldWrapper")[3].children[1].children[1]);
//         }
        
//         if (document.querySelectorAll(".CreeperBar").length > 0) {
//             var parent = document.querySelector(".CreeperBar");
//             console.log(parent);
//             if (parent.getElementsByTagName("label")[0].textContent.indexOf("Creeper Bars") >= 0) {
//                 var cells = parent.children[0].children[0].children[0].children[1].children;
//                 console.log(cells);
//                 for (cell in cells) {
//                     var c = cells[cell];
//                     if (typeof c === "object") {
//                         var inside = c.children[0];
//                         var mainbackgroundimage = inside.children[6].getElementsByTagName("label")[0];
//                         mainbackgroundimage.textContent = "Small Side Image";
//                         var secondaryImageHeader = inside.getElementsByTagName("h6")[1];
//                         secondaryImageHeader.textContent = "Full Width Image (Optional)";
//                         var secondaryImage = inside.getElementsByTagName("h6")[1].children[11].getElementsByTagName("label")[0];
//                         secondaryImage.textContent = "Full Width Image - Desktop";
//                         var secondaryImageURL = inside.getElementsByTagName("h6")[1].children[12].getElementsByTagName("label")[0];
//                         secondaryImage.textContent = "Full Width Image - Mobile";
//                         var secondaryImageAlt = inside.getElementsByTagName("h6")[1].children[13].getElementsByTagName("label")[0];
//                         secondaryImage.textContent = "Countdown Timer Date and Time - Example: May 1 2019 00:00:00 MDT";
//                         var secondaryImageAltContainer = inside.getElementsByTagName("h6")[1].children[14];
//                         var timerHeaderCreate = inside.getElementsByTagName("h6")[1].cloneNode.textContent = "Countdown Timer";
//                         secondaryImageAltContainer.before(timerHeaderCreate);
//                     }
                    
//                     // console.log();
//                 }
//             }
//         }
//     }
// }
// if (window.location.href.indexOf("cms.bodybuilding.com") > -1) {
//     dotcms.changeCreeper();
//     // setInterval(function () {
//     //     dotcms.changeCreeper();
//     //     console.log('fiting');
//     // }, 2000);
// }