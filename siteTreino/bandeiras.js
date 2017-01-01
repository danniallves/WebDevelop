var bandeira = document.getElementById("bandeira");
var bandeirasMercosul = ["br", "ar", "uy", "py"];
var indiceBandeira = 0;

function mudaBandeira() {
    indiceBandeira++;
    indiceBandeira %= bandeirasMercosul.length;
    bandeira.setAttribute("src", "imagens/bandeiras/flags-normal/" + bandeirasMercosul[indiceBandeira] + ".png");
}