
var counters = [];
var elems = [];
var cores = ["red", "green", "blue"];


function changeColor(elem) {
    "use strict";
    var i = elems.indexOf(elem.id);
    if (i === -1) {
        counters.push(0);
        elems.push(elem.id);
        i = elems.indexOf(elem.id);
    }
    /*addElement(elem);
    i = elems.indexOf(elem.id);*/
    counters[i]++;
    elem.style.backgroundColor = cores[counters[i] % 3];
}

