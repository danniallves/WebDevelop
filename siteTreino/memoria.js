var num = 1;
var primeiroClick = 0;
var segundoClick = 0;

//função que cria a tabela com "lin" linhas e "col" colunas
function criarTabela(lin, col) {
    
	var numCartas = lin*col/2;
	var arrayCartas = [];
	for (var i = 1; i <= numCartas; i++) {
		arrayCartas.push(i);
		arrayCartas.push(i);
	}
	
    var table = document.createElement("table");
    table.id = "tabela";
    
    //loop para criar a matrix
    for (var i = 0; i < lin; i++) {
        var row = table.insertRow(i);
        for (var j = 0; j < col; j++) {
            var cell = row.insertCell(j);
            /*var carta = document.createElement("div");
            carta.className = "carta _" + num.toString();
            carta.innerHTML = num;*/
			var containerCarta = criaContainerCarta();
			var carta = containerCarta.getElementsByClassName("carta")[0];
			var indiceAleatorio = Math.floor(Math.random()*1000) % arrayCartas.length;
			var num = arrayCartas[indiceAleatorio];
			carta.className += " _" + num;
			carta.childNodes[1].innerHTML = "";
			carta.childNodes[3].innerHTML = num;
            cell.appendChild(containerCarta);
            arrayCartas.splice(indiceAleatorio, 1);
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
	viraCarta(carta1);
	viraCarta(carta2);
}
///////////////////////////////////////////////////////////////////


function selecionaCarta() {
	
	viraCarta(this);
	
    //se for o primeiro click
    if (primeiroClick == 0) {
        primeiroClick = this.className;
        this.className += " marcado";
    }
    
    //se for o segundo click
    else {
        segundoClick = this.className;
        var marcado = document.getElementsByClassName("marcado")[0];
		var indiceMarcado = marcado.className.indexOf("marcado");
		//retira a classe marcado 
        marcado.className = marcado.className.substring(0, indiceMarcado - 1) + marcado.className.substring(indiceMarcado + 7, marcado.className.length); 
        
        //se as cartas corresponderem
        if (primeiroClick == segundoClick) {
            var bingo = document.getElementsByClassName(primeiroClick);
            bingo[0].className += " certo";
            bingo[1].className += " certo";
            setTimeout(function(){ desmarcaCerto(bingo[0], bingo[1]) }, 1500);
            
        }
        // as cartas não correspondem
        else {
            marcado.className += " errado";
            segCarta = this;
            segCarta.className += " errado";
            setTimeout(function(){ desmarcaErrado(marcado, segCarta) }, 1500);
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


///função para virar e desvirar as cartas
function viraCarta(cartaNode) {
	
	var card = cartaNode;
	
	var indice = card.className.indexOf("virada"); //busca em que parte do nome da classe está a palavra "virada"
	
	//se a carta já estiver virada
	if (indice != -1) {
		card.className = card.className.substring(0, indice - 1) + card.className.substring(indice + 6, card.className.length); //desvira a carta
	}
	//se ainda não estiver virada
	else {
		card.className += " virada"; //vira a carta
	}
}


//função para criar as cartas com frente e verso
function criaContainerCarta() {
	
	var cartaMae = document.getElementById("cartaMae");
	var container = cartaMae.getElementsByClassName("container")[0];
	var containerClone = container.cloneNode(true);
	return containerClone;
	
}


