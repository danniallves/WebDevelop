var bola = document.getElementById("bola-quique");
var btnPlay = document.getElementById("play");
var btnRestart = document.getElementById("restart");

function start() {
	bola.style.animationPlayState = "running";
	btnPlay.innerHTML = "Pausar";
	btnRestart.style.display = "inline-block";
}

function stop() {
	bola.style.animationPlayState = "paused";
	btnPlay.innerHTML = "Continuar";
}

function restart() {
	bola.style.animationPlayState = "paused";
	bola.parentNode.replaceChild(bola,bola);
	btnPlay.innerHTML = "Iniciar";
	btnRestart.style.display = "none";
}

function controle() {
	if ( btnPlay.innerHTML == "Pausar" ) {
		stop();
	} else {
		start();
	}
}

btnPlay.onclick = controle;
btnRestart.onclick = restart;