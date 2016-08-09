
var counter = 0;
var cores = ["red", "green", "blue"];
var bolinhas = document.getElementsByClassName("bolinha");


function mudaCor(elem) {
	"use strict";
    counter++;
	elem.style.backgroundColor = cores[counter % 3];

}

var counters = [];
var elems = [];

function contains(arr, ident) {
    "use strict";
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === ident) {
            return true;
        }
    }
    return false;
}

function addElement(elem) {
    "use strict";
    if (!(contains(elems, elem.id))) {
        counters.push(0);
        elems.push(elem.id);
    }
}

function changeColor(elem) {
    "use strict";
    var i;
    addElement(elem);
    i = elems.indexOf(elem.id);
    counters[i]++;
    elem.style.backgroundColor = cores[counters[i] % 3];
}








