//depends on helperFunctions.js
//depends on minesObjects.js

////////////////////////////  CONTROLLER //////////////////////////////////////////////////////////////

//Contructor for the Mines controller
function Controller() {
    this.identity = "Controller";
    this.gameFrame = document.getElementById("gameFrame");
    this.gridFrame = document.getElementById("gridFrame");
    this.tableGrid = document.getElementById("grid");
    this.clock = document.getElementById("clock");
    this.refreshClockId = 0;
    this.emoticon = document.getElementById("emoticon");
    this.processing = false;
    
    /////// setting the game interface  /////////////////
    this.gameFrame.style.display = "none";
    //select initially the first option for gridSize and numBombs
    document.getElementById("gridSize").getElementsByTagName("input")[0].checked = true;
    document.getElementById("numBombs").getElementsByTagName("input")[0].checked = true;
    this.ui = {
        btnStart : document.getElementById("btnStart"),
        btnFlags : document.getElementById("btnFlags"),
        numFlags : document.getElementById("numFlags"),
        //menu : document.getElementById("menu"),
        menu : {
            menuIcon : document.getElementById("menuIcon"),
            btnNewGame : document.getElementById("newGame"),
            btnQuit : document.getElementById("quit")
        },
        options : document.getElementById("options")
        //gridButtons will be added once the grid is drew
    };
    this.ui.btnFlags.isClicked = false;
    ///////////////////////////////////////////////////////
    this.successMatches = [];
    
    //this.match = new Match();
    //match object will be added after btnStart is clicked
}

//methods
//draws the match grid inside the table
Controller.prototype.drawGrid = function() {
    while(this.tableGrid.firstChild) {
        this.tableGrid.removeChild(this.tableGrid.firstChild);
    }
    if (this.match) {
        var numCols = this.match.grid.columns;
        var numRows = this.match.grid.rows;
        var position = new Position(1, 1, numRows, numCols);
        for (var i = 1; i <= numRows; i++) {
            var tr = document.createElement("tr");
            for (var j = 1 ; j <= numCols; j++) {
                //set the position of the element on the grid
                position.row = i; position.col = j; 
                var td = document.createElement("td");
                var btn = document.createElement("button");
                btn.className = "gridButton";
                btn.position = position.toString();
                //put the number of neighbor bombs as the td className
                var squareStr = this.match.grid.getSquareAtPosition(position).toString();
                td.className = "_" + squareStr;
                td.position = position.toString();
                if (squareStr != "0") td.innerHTML = squareStr;
                td.appendChild(btn);
                tr.appendChild(td);
            }
            this.tableGrid.appendChild(tr);
        }
    }
    else { //match is not set, so there can't be any grid to draw
        return false;
    }
    return true;
}

//set the game frame width and height
Controller.prototype.setGameFrameDimensions = function(width, height) {
    //alert("called set game frame");
    if (width && height) {
        this.gameFrame.width = width;
        this.gameFrame.height = height;
    }
    else if (this.match && this.ui.gridButtons) {
        //alert("setting frame width and height automatically");
        var gridWidth = 50 * this.match.grid.columns;
        var gridHeight = 50 * this.match.grid.rows;
        
        this.gridFrame.style.width = gridWidth.toString() + "px";
        this.gridFrame.style.height = gridHeight.toString() + "px";
        
        this.gameFrame.style.width = (gridWidth + 20).toString() + "px";
        this.gameFrame.style.height = (gridHeight + 80).toString() + "px";
    }
    else {
        //alert("mama mia");
    }
}

//refreshes the clock innerHTML
Controller.prototype.refreshClock = function() {
    var time = this.match.time;
    var hours = Math.floor(time/3600);
    time %= 3600;
    var mins = Math.floor(time/60);
    time %= 60;
    var secs = time;
    this.clock.innerHTML = formatNumber(hours, 2) + ":" + formatNumber(mins, 2) + ":" + formatNumber(secs, 2);
}

//refreshes the flagCounter
Controller.prototype.refreshFlagCounter = function() {
    this.ui.numFlags.innerHTML = this.match.numFlags;
}

//flags or unflags the specified button
Controller.prototype.buttonToggleFlagged = function(btn) {
    //if the button is a gridButton
    if (btn.className.search("gridButton") !== -1) {
        var pos = btn.className.search("flagged");
        if (pos === -1) {
            btn.className += " flagged";
        }
        else {
            btn.className = btn.className.substring(0, pos);
        }
    }
} 

//trigged when the match ends
Controller.prototype.matchEnded = function() {
    if (this.refreshClockId !== 0) {
        clearInterval(this.refreshClockId);
    }
    if (this.match.endedWith === "success") {
        alert("Woohoo!");
        this.match.user.name = prompt("Your name for the record", "Player");
        this.successMatches.push(this.match.clone());
    }
    else {
        alert("Boom!");
    }
    this.gameFrame.style.display = "none";
    this.ui.options.style.display = "block";
}

//processes the actual state of the grid hiding the grid buttons that represent unveiled squares
Controller.prototype.processGrid = function() {
    this.processing = true;
    if (this.ui.gridButtons) {
        var square;
        var btn;
        for (var i = 0; i < this.ui.gridButtons.length; i++) {
            btn = this.ui.gridButtons[i];
            //if the button is not invisible
            if (btn.style.display !== "none") {
                square = this.match.grid.getSquareAtPosition(btn.position);
                if (square.unveiled) {
                    btn.style.display = "none";
                }
            }
        }
        this.match.checkStatus();
        //alert(this.match.time);
        if (this.match.status === "ended") {
            this.matchEnded();
        }
    }
    this.processing = false;
}

//adds the EventListener 'click' to all gridButtons
Controller.prototype.addGridButtonsBehaviour = function() {
    var controller = this;
    controller.ui.gridButtons = document.getElementsByClassName("gridButton");
    for (var i = 0; i < controller.ui.gridButtons.length; i++) {
        controller.ui.gridButtons[i].addEventListener("click", function() {
            //will only do something if the controller is not processing and the match is running
            if (!controller.processing && controller.match.status === "running") {
                
                var position = this.position;
                var square = controller.match.grid.getSquareAtPosition(position);
                controller.match.clickSquare(square);
                
                if (controller.match.flagMode) { //if the game is in flagMode
                    controller.buttonToggleFlagged(this);
                    controller.refreshFlagCounter();
                }
                else {
                    controller.processGrid();
                }
            }
        });
        controller.ui.gridButtons[i].addEventListener("mouseover", function() {
            if (!controller.match.flagMode && this.className.search("flagged") !== -1) {
                this.style.cursor = "default";
            }
        });
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

var controller = new Controller();

controller.ui.btnStart.addEventListener("click", function() {
    //get the selected options for the game (gridSize and numBombs)
    var gridSize;
    var numBombs;
    var gameOptions = controller.ui.options.getElementsByTagName("input");
    for (var i = 0; i < gameOptions.length; i++) {
        if (gameOptions[i].checked) {
            //alert("checked at " + i);
            if (gameOptions[i].name === "grid_size") {
                gridSize = gameOptions[i].value;
            }
            else if (gameOptions[i].name === "num_bombs") {
                numBombs = parseInt(gameOptions[i].value);
            }
        }
    }
    controller.match = new Match(gridSize, numBombs);
    controller.drawGrid();
    controller.refreshFlagCounter();
    controller.addGridButtonsBehaviour();
    controller.setGameFrameDimensions();
    controller.match.start();
    controller.ui.options.style.display = "none";
    controller.gameFrame.style.display = "block";
    controller.refreshClockId = setInterval(function() {
        controller.refreshClock();
    }, 500);
});

controller.ui.btnFlags.toggleClicked = function() {
    this.isClicked = toggleState(this.isClicked);
    var pos = this.className.search("clicked");
    if (this.isClicked) {
        if (pos === -1) {
            this.className += " clicked";
        }
    }
    else {
        if (pos !== -1) {
            this.className = this.className.substring(0, pos);
        }
    }
}

controller.ui.btnFlags.addEventListener("click", function() {
    controller.ui.btnFlags.toggleClicked();
    controller.match.toggleFlagMode();
});