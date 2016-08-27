var palhetaAzul = document.getElementsByClassName("palheta-GV-azul")[0];
var palhetaClone = palhetaAzul.cloneNode();

function giraPalheta(elem) {
    "use strict";
    elem.previousSibling.style.animationPlayState = "running";
}

function paraPalheta(elem) {
    "use strict";
    var ancestor = elem.parentNode;
    var pal = elem.previousSibling;
    pal.style.animationPlayState = "paused";
    ancestor.removeChild(pal);
    pal = palhetaClone.cloneNode();
    ancestor.insertBefore(pal, elem);
}