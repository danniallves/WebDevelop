function myFunction() {
    var x = document.getElementById("ul-menu-top");
    if (x.className === "menu-responsivo") {
        x.className += " menu-show";
    }
    else {
        x.className = "menu-responsivo";
    }
}