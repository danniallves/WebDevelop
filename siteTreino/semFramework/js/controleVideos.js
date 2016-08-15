var btnPrevious = document.getElementById("previous");
var btnNext = document.getElementById("next");
var faixas = document.getElementsByClassName("faixa");
var telaVideo = document.getElementsByClassName("embedded-video")[0];
var telinha = document.getElementById("video-frame");
var youTube = "https://www.youtube.com/embed/";
var pointer = 1;
var menuVideo = document.getElementsByClassName("menu-video");
var videosYouTube = document.getElementsByClassName("video-youtube");
menuVideo[0].style.display = "none";
var corBtnDesativado = "rgba(0, 0, 0, 0.0)";
var corBtnAtivo = "rgba(210, 224, 224, 0.6)";

telaVideo.onmouseover = function () {
    "use strict";
    var i;
    telinha.style.margin = "0";
    for (i = 0; i < 2; i++) {
        faixas[i].style.display = "block";
    }
};

telaVideo.onmouseout = function () {
    "use strict";
    var i;
    telinha.style.margin = "0 10%";
    for (i = 0; i < 2; i++) {
        faixas[i].style.display = "none";
    }
};

function btnChangeDisplay() {
    "use strict";
    if (pointer === 1) {
        menuVideo[0].style.display = "none";
        menuVideo[menuVideo.length - 1].style.display = "block";
    }
    else if (pointer === menuVideo.length - 2) {
        menuVideo[0].style.display = "block";
        menuVideo[menuVideo.length - 1].style.display = "none";
    }
    else {
        menuVideo[0].style.display = "block";
        menuVideo[menuVideo.length - 1].style.display = "block";
    }
}

function getCodigo(indice) {
    "use strict";
    var endereco = videosYouTube[indice].getAttribute("href");
    var codigo = endereco.substring(endereco.length - 11, endereco.length);
    codigo += "?rel=0";
    return codigo;
}

/*function getMatchIndex(elem) {
    "use strict";
    var tenta;
    var busca = elem.title;
    for (var i = 0 ; i < videosYouTube.length; i++) {
        tenta = videosYouTube[i].innerHTML;
        if (tenta === busca) {
            return i;
        }
    }
    alert("Deu Bode em getMatchIndex!");
}
*/

function mudaVideo(botao) {
    "use strict";
    if (botao.id === "forth") {
        pointer++;
    }
    else if (botao.id === "back") {
        pointer--;
    }
    else {
        pointer = parseInt(botao.innerHTML);
    }
    
    var cod = getCodigo(pointer - 1);
    telinha.setAttribute("src", youTube + cod);
    btnChangeDisplay();
    manipulaCor();
}

function manipulaCor() {
    "use strict";
    if (pointer < 4) {
        btnNext.style.backgroundColor = corBtnAtivo;
    }
    else {
        btnNext.style.backgroundColor = corBtnDesativado;
    }
    if (pointer > 1) {
        btnPrevious.style.backgroundColor = corBtnAtivo;
    }
    else {
        btnPrevious.style.backgroundColor = corBtnDesativado;
    }
    
}

function passaVideo(botao) {
    "use strict";
    if (botao === btnPrevious && pointer > 1) {
        pointer--;
        var cod = getCodigo(pointer - 1);
        telinha.setAttribute("src", youTube + cod);
    }
    else if (botao === btnNext && pointer < 4) {
        pointer++;
        var cod = getCodigo(pointer - 1);
        telinha.setAttribute("src", youTube + cod);
    }
    btnChangeDisplay();
    manipulaCor();
}