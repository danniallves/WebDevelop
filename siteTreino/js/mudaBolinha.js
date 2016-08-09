
var counter = 0;
var cores = ["red", "green", "blue"];
var bolinhas = document.getElementsByClassName("bolinha");

function mudaCor(elem) {
	"use strict";
    counter++;
	elem.style.backgroundColor = cores[counter % 3];

}

