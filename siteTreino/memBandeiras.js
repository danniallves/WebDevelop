//função que cria a tabela com "lin" linhas e "col" colunas
function criarTabuleiro(lin, col) {
    var paises = america_sul.slice();
	var numCartas = lin*col/2;
	var arrayCartas = [];
	for (var i = 1; i <= numCartas; i++) {
        var indice = Math.floor(Math.random()*1000) % paises.length;
		arrayCartas.push({tipo: "nome", classe: paises[indice].alias, conteudo: paises[indice].nome});
        arrayCartas.push({tipo: "bandeira", classe: paises[indice].alias, conteudo: "<img src='imagens/bandeiras/americas/" + paises[indice].bandeira + "' alt='bandeira " + paises[indice].nome + "'>"});
        paises.splice(indice, 1);
	}
	
    var table = document.createElement("table");
    table.id = "tabuleiro";
    
    //loop para criar a matrix
    for (var i = 0; i < lin; i++) {
        var row = table.insertRow(i);
        for (var j = 0; j < col; j++) {
            var cell = row.insertCell(j);
			var containerCarta = criaContainerCarta();
			var carta = containerCarta.getElementsByClassName("carta")[0];
			var indiceAleatorio = Math.floor(Math.random()*1000) % arrayCartas.length;
			var conteudoCarta = arrayCartas[indiceAleatorio];
			carta.className += " " + conteudoCarta.classe;
			carta.childNodes[1].innerHTML = "";
            carta.childNodes[3].innerHTML = conteudoCarta.conteudo;
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
function comecarJogoBandeiras() {
	var linhas;
	var colunas;
	
	var dificuldade = document.getElementsByName("dificuldade");

	for (var i = 0; i < dificuldade.length; i++) {
		if (dificuldade[i].checked) {
			switch(dificuldade[i].value) {
				case "facil": 
					linhas = 4;
					colunas = 2;
					break;
				case "medio":
					linhas = 4;
					colunas = 3;
					break;
				case "dificil":
					linhas = 4;
					colunas = 4;
					break;
				case "desafio":
					linhas = 5;
					colunas = 8;
					break;
				default:
					linhas = 4;
					colunas = 2;
			}
			
			break;
		}//fim do if checked
	}//fim do loop para varrer as opcoes de dificuldade
	
	document.getElementById("opcoes").style.display = "none";
	document.getElementById("jogo").style.display = "block";
	document.getElementById("terminar").style.display = "block";
	
	var numCartasDiferentes = linhas*colunas/2;
	document.getElementById("numCartasDiferentes").innerHTML = numCartasDiferentes;
    document.getElementById("acertos").innerHTML = 0;
	
	criarTabuleiro(linhas, colunas);
	
	var cartas = document.getElementsByClassName("carta");
	for (var i = 0; i < cartas.length; i++) {
		cartas[i].onclick = selecionaCarta; 
	}
}
//fim de comecarJogo