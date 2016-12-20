var num = 1;
var wid = document.getElementById("widthCarta");

var primeiroClick = 0;
var segundoClick = 0;

var table = document.createElement("table");

//loop para criar a matrix
for (var i = 0; i < 4; i++) {
    var row = table.insertRow(i);
    for (var j = 0; j < 4; j++) {
        var cell = row.insertCell(j);
        var carta = document.createElement("div");
        carta.className = "carta _" + num;
        carta.innerHTML = num;
        cell.appendChild(carta);
        num %= 8;
        num++;
    }
}

var jogo = document.getElementById("jogo");
jogo.appendChild(table);

function selecionaCarta() {
    if (primeiroClick == 0) {
        primeiroClick = this.className;
        this.className += " marcado";
    }
    else {
        segundoClick = this.className;
        var marcado = document.getElementsByClassName("marcado")[0];
        marcado.className = marcado.className.substr(0, 8);
        if (primeiroClick == segundoClick) { //se as cartas corresponderem
            var bingo = document.getElementsByClassName(segundoClick);
            bingo[0].className += " pareado";
            bingo[1].className += " pareado";
        }
        primeiroClick = 0;
    }
}

var cartas = document.getElementsByClassName("carta");
for (var i = 0; i < cartas.length; i++) {
    cartas[i].onclick = selecionaCarta; 
}
 
