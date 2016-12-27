var primeiroClick = 0;
var segundoClick = 0;

//função que cria a tabela com "lin" linhas e "col" colunas
function criarTabuleiro(lin, col) {
    
	var numCartas = lin*col/2;
	var arrayCartas = [];
	for (var i = 1; i <= numCartas; i++) {
		arrayCartas.push(i);
		arrayCartas.push(i);
	}
	
    var table = document.createElement("table");
    table.id = "tabuleiro";
    
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
	
    
	//pega o nó jogo
	var jogo = document.getElementById("jogo");
	
    //adiciona a tabela ao jogo
    jogo.appendChild(table);
}


//função que começa o jogo
function comecarJogo() {
	var linhas;
	var colunas;
	
	var dificuldade = document.getElementsByName("dificuldade");

	for (var i = 0; i < dificuldade.length; i++) {
		if (dificuldade[i].checked) {
			switch(dificuldade[i].value) {
				case "facil": 
					linhas = 3;
					colunas = 4;
					break;
				case "medio":
					linhas = 4;
					colunas = 6;
					break;
				case "dificil":
					linhas = 5;
					colunas = 6;
					break;
				case "desafio":
					linhas = 5;
					colunas = 8;
					break;
				default:
					linhas = 2;
					colunas = 3;
			}
			
			break;
		}//fim do if checked
	}//fim do loop para varrer as opcoes de dificuldade
	
	document.getElementById("opcoes").style.display = "none";
	document.getElementById("jogo").style.display = "block";
	document.getElementById("terminar").style.display = "block";
	
	var numCartasDiferentes = linhas*colunas/2;
	document.getElementById("numCartasDiferentes").innerHTML = numCartasDiferentes;
	
	criarTabuleiro(linhas, colunas);
	
	var cartas = document.getElementsByClassName("carta");
	for (var i = 0; i < cartas.length; i++) {
		cartas[i].onclick = selecionaCarta; 
	}
}
//fim de comecarJogo

//função que termina o jogo 
function terminarJogo() {
	
	var jogo = document.getElementById("jogo");
	var tabuleiro = document.getElementById("tabuleiro");
    //retira o tabuleiro do jogo
    jogo.removeChild(tabuleiro);
	
	alert("O jogo acabou");
	
	document.getElementById("terminar").style.display = "none";
	document.getElementById("jogo").style.display = "none";
	document.getElementById("opcoes").style.display = "block";
}


//função para retirar a classe de um elemento 
function retiraClasse(elemento, classe) {
	var indice = elemento.className.indexOf(classe);
	if (indice != -1) {
		elemento.className = elemento.className.substring(0, indice - 1) + elemento.className.substring(indice + classe.length, elemento.className.length);
		//marcado.className = marcado.className.substring(0, indiceMarcado - 1) + marcado.className.substring(indiceMarcado + 7, marcado.className.length);
	}
}

//funções de ajuda para tirar as sombras de certo e errado
////////////////////////////////////////////////////////////////
function desmarcaCerto(carta1, carta2) {
    //carta1.className = carta1.className.substr(0, carta1.className.length - 6);
    //carta2.className = carta2.className.substr(0, carta2.className.length - 6);
	retiraClasse(carta1, "certo");
	retiraClasse(carta2, "certo");
    carta1.className += " pareado";
    carta2.className += " pareado";
}

function desmarcaErrado(carta1, carta2) {
    //carta1.className = carta1.className.substr(0, carta1.className.length - 7);
    //carta2.className = carta2.className.substr(0, carta2.className.length - 7);
	retiraClasse(carta1, "errado");
	retiraClasse(carta2, "errado");
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
        //marcado.className = marcado.className.substring(0, indiceMarcado - 1) + marcado.className.substring(indiceMarcado + 7, marcado.className.length); 
		retiraClasse(marcado, "marcado");
        
        //se as cartas corresponderem
        if (primeiroClick == segundoClick) {
            var bingo = document.getElementsByClassName(primeiroClick);
            bingo[0].className += " certo";
            bingo[1].className += " certo";
			var acertos = document.getElementById("acertos");
			var numAcertos = parseInt(acertos.innerHTML);
			numAcertos++;
			acertos.innerHTML = numAcertos;
            setTimeout(function(){ desmarcaCerto(bingo[0], bingo[1]) }, 1500);
            if (document.getElementById("numCartasDiferentes").innerHTML == document.getElementById("acertos").innerHTML) {
				setTimeout(terminarJogo, 2000);
			}
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
    //fim de se for o segundo click
}//fim de selecionaCarta


///função para virar e desvirar as cartas
function viraCarta(cartaNode) {
	
	var card = cartaNode;
	
	var indice = card.className.indexOf("virada"); //busca em que parte do nome da classe está a palavra "virada"
	
	//se a carta já estiver virada
	if (indice != -1) {
		//card.className = card.className.substring(0, indice - 1) + card.className.substring(indice + 6, card.className.length); //desvira a carta
		retiraClasse(card, "virada");
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


