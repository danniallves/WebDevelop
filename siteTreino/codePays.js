//Écriture du titre
document.getElementById("titre").innerHTML = "<h1>Jeu des pays</h1>";

//tableau dans l'ordre de l'alphabet
var tableauPays = new Array();
tableauPays[0] = "Choisir...";
tableauPays[1] = "Afghanistan";
tableauPays[2] = "Azerbaïdjan";
tableauPays[3] = "Kirghizistan";
tableauPays[4] = "Ouzbékistan";
tableauPays[5] = "Pakistan";
tableauPays[6] = "Tadjikistan";
tableauPays[7] = "Turkiménistan";

//Tableau des pays dans le bon ordre
var tableauOrdrePays = new Array();
tableauOrdrePays[1] = "Azerbaïdjan";
tableauOrdrePays[2] = "Turkménistan";
tableauOrdrePays[3] = "Ouzbékistan";
tableauOrdrePays[4] = "Afghanistan";
tableauOrdrePays[5] = "Pakistan";
tableauOrdrePays[6] = "Tadjikistan";
tableauOrdrePays[7] = "Kirghizistan";

for (var i = 1; i < tableauOrdrePays.length; i++) {
    creerSelect(i);
}

//fonction Creer Select
function creerSelect(nb) {
    "use strict";
    var clone = document.getElementById("listePays").cloneNode(true);
    
    clone.id = "liste" + nb;
    
    var listes = document.forms["listes"];
    
    var spanNode = document.createElement("span");
    spanNode.id = "numero" + nb;
    spanNode.innerHTML = nb;
    spanNode.className = "wilson";
    listes.appendChild(spanNode);
    
    listes.appendChild(clone);
    
    var sautLigne = document.createElement("br");
    listes.appendChild(sautLigne);
}

//fonction Valider
function fonctionValider() {
    //boucle sur les listes
    for (var i = 1; i <= 7 ; i++) {
        //récupération de l'index, puis de la valeur choisie
        var indexChoisi = document.forms["listes"].elements["liste"+i].selectedIndex;
        var paysChoisi = document.forms["listes"].elements["liste"+i].options[indexChoisi].value;
        
        //teste si la liste i affiche le bon pays
        if (paysChoisi == tableauOrdrePays[i]) {
            document.getElementById("numero"+i).style.backgroundColor = "#0066cc";
            //document.getElementById("numero"+i).className = "OK";
        }
        else {
            document.getElementById("numero"+i).style.backgroundColor = "#cc6600";
            //document.getElementById("numero"+i).className = "NOK";
        }
    }
}

//fonction Reset
function fonctionReset() {
    //boucle sur les listes
    for (var i = 1; i <=7; i++) {
        //affichage première valeur
        document.forms["listes"].elements["liste"+i].selectedIndex = 0;
        document.getElementById("numero"+i).style.backgroundColor = "#ffffff";
        //document.getElementById("numero"+i).className = "";
    }
}