var counter = 0;
var cores = ["red", "green", "blue"];


function clickBolinha(elem) {
	counter++;
	elem.style.backgroundColor = cores[counter%3];
}