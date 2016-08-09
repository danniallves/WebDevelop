var bola = document.getElementById("bola-quique");
var bolaClone = bola.cloneNode();
var btnPlay = document.getElementById("play");
var btnRestart = document.getElementById("restart");

function start() {
    "use strict";
	bola.style.animationPlayState = "running";
	btnPlay.innerHTML = "Pausar";
	btnRestart.style.display = "inline-block";
}

function stop() {
    "use strict";
	bola.style.animationPlayState = "paused";
	btnPlay.innerHTML = "Continuar";
}

function restart() {
    "use strict";
	bola.style.animationPlayState = "paused";
	bola.parentNode.replaceChild(bola, bola);
	btnPlay.innerHTML = "Iniciar";
	btnRestart.style.display = "none";
}

//No Google Chrome a função restart não está funcionando direito, essa versão funciona para todos os navegadores.
function restartChrome() {
    "use strict";
    var pai = bola.parentNode;
    bola.style.animationPlayState = "paused";
    pai.removeChild(bola);
    bola = bolaClone.cloneNode();
    pai.appendChild(bola);
	btnPlay.innerHTML = "Iniciar";
	btnRestart.style.display = "none";
}

function controle() {
    "use strict";
	if (btnPlay.innerHTML === "Pausar") {
		stop();
	} else {
		start();
	}
}

btnPlay.onclick = controle;
btnRestart.onclick = restartChrome;