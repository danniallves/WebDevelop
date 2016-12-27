var num = 1;
var primeiroClick = 0;
var segundoClick = 0;

//função que cria a tabela com "lin" linhas e "col" colunas
function criarTabela(lin, col) {
    
    var table = document.createElement("table");
    table.id = "tabela";
    
    //loop para criar a matrix
    for (var i = 0; i < lin; i++) {
        var row = table.insertRow(i);
        for (var j = 0; j < col; j++) {
            var cell = row.insertCell(j);
            var carta = document.createElement("div");
            carta.className = "carta _" + num.toString();
            carta.innerHTML = num;
            cell.appendChild(carta);
            num %= lin*col/2;
            num++;
        }
    }
    
    //adiciona a tabela ao jogo
    document.getElementById("jogo").appendChild(table);
}

criarTabela(4,6);


//funções de ajuda para tirar as sombras de certo e errado
////////////////////////////////////////////////////////////////
function desmarcaCerto(carta1, carta2) {
    carta1.className = carta1.className.substr(0, carta1.className.length - 6);
    carta2.className = carta2.className.substr(0, carta2.className.length - 6);
    carta1.className += " pareado";
    carta2.className += " pareado";
}

function desmarcaErrado(carta1, carta2) {
    carta1.className = carta1.className.substr(0, carta1.className.length - 7);
    carta2.className = carta2.className.substr(0, carta2.className.length - 7);
}
///////////////////////////////////////////////////////////////////


function selecionaCarta() {
    //se for o primeiro click
    if (primeiroClick == 0) {
        primeiroClick = this.className;
        this.className += " marcado";
    }
    
    //se for o segundo click
    else {
        segundoClick = this.className;
        var marcado = document.getElementsByClassName("marcado")[0];
        marcado.className = marcado.className.substr(0, 9); //retira a classe marcado 
        
        //se as cartas corresponderem
        if (primeiroClick == segundoClick) {
            var bingo = document.getElementsByClassName(primeiroClick);
            bingo[0].className += " certo";
            bingo[1].className += " certo";
            setTimeout(function(){ desmarcaCerto(bingo[0], bingo[1]) }, 500);
            
        }
        // as cartas não correspondem
        else {
            marcado.className += " errado";
            segCarta = this;
            segCarta.className += " errado";
            setTimeout(function(){ desmarcaErrado(marcado, segCarta) }, 500);
        }
        
        //reseta o primeiro click
        primeiroClick = 0; 
    }
    //fim das condicionais
}//fim de selecionaCarta

var cartas = document.getElementsByClassName("carta");
for (var i = 0; i < cartas.length; i++) {
    cartas[i].onclick = selecionaCarta; 
}


//parte de virar a carta

//var card = document.getElementById("card");

function flipCard(cartaNode) {
	//alert("vira a carta");
	//var card = document.getElementById("card");
	//var card = cartaNode.parentNode;
	var card = cartaNode;
	
	/*if (carta.className == "front") {
		carta.className = "back";
	}
	else {
		carta.className = "front";
	}*/
	
	//alert(card.className.substr(card.className.length - 8, 8));
	
	if (card.className.substr(card.className.length - 7, 7) == "flipped") {
		card.className = card.className.substr(0, card.className.length - 7);
	}
	else {
		card.className += " flipped";
	}
}
 
