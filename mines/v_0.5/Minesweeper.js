function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


//////////////////////////  POSITION  ////////////////////////////////////////////
//constructor
function Position(x, y) {
    if (x !== undefined) {
        this.row = x;
    }
    else {
        this.row = 1;
    }
    if (y !== undefined) {
        this.col = y;
    }
    else {
        this.col = 1;
    }
}

//methods
Position.prototype.toString = function() {
    return "(" + this.row + ", " + this.col + ")";
}
/////////////////////////////////////////////////////////////////////////////////


////////////////////////////  SQUARE  ////////////////////////////////////////////////////////////////
//constructor
function Square(isBomb, position) {
    if (isBomb) {
        this.isBomb = true;
    }
    else {
        this.isBomb = false;
    }
    
    if (position !== undefined) {
        this.position = position;
    }
    
    this.neighborBombs = 0;
    this.unveiled = false;
    this.flagged = false;
}

//methods
Square.prototype.getNeighborAt = function(relPos, grid) {
    //return the neighbor Square at the specified relative position eg. upperLeft, left, lowerRight, up
    if (relPos.indexOf("up") !== -1 && this.position.row === 1) {
        //first row doesn't have any up ('up', 'upperLeft', 'upperRight') neighbor
        return false;
    }
    
    if (relPos.indexOf("ow") !== -1 && this.position.row === grid.rows) {
        //last row doesn't have any ow ('down', 'lowerLeft', 'lowerRight') neighbor
        return false;
    }
    
    if (relPos.indexOf("eft") !== -1 && this.position.col === 1) {
        //first collumn doesn't have any left ('left', 'upperLeft', 'lowerLeft') neighbor
        return false;
    }
    
    if (relPos.indexOf("ight") !== -1 && this.position.col === grid.columns) {
        //first row doesn't have any right ('right', 'upperRight', 'lowerRight') neighbor
        return false;
    }
    
    switch(relPos) {
        case "up": 
            return grid.getSquareAtPosition(new Position(this.position.row - 1, this.position.col));
            break;
        case "down": 
            return grid.getSquareAtPosition(new Position(this.position.row + 1, this.position.col));
            break;
        case "left": 
            return grid.getSquareAtPosition(new Position(this.position.row, this.position.col - 1));
            break;
        case "right": 
            return grid.getSquareAtPosition(new Position(this.position.row, this.position.col + 1));
            break;
        case "upperLeft": 
            return grid.getSquareAtPosition(new Position(this.position.row - 1, this.position.col - 1));
            break;
        case "upperRight": 
            return grid.getSquareAtPosition(new Position(this.position.row - 1, this.position.col + 1));
            break;
        case "lowerLeft": 
            return grid.getSquareAtPosition(new Position(this.position.row + 1, this.position.col - 1));
            break;
        case "lowerRight": 
            return grid.getSquareAtPosition(new Position(this.position.row + 1, this.position.col + 1));
            break;
    }
}

Square.prototype.setNeighborBombs = function(grid) {
    var up = this.getNeighborAt("up", grid);
    if (up) {
        if (up.isBomb) {
            this.neighborBombs++;
        }
    }
    var down = this.getNeighborAt("down", grid);
    if (down) {
        if (down.isBomb) {
            this.neighborBombs++;
        }
    }
    var left = this.getNeighborAt("left", grid);
    if (left) {
        if (left.isBomb) {
            this.neighborBombs++;
        }
    }
    var right = this.getNeighborAt("right", grid);
    if (right) {
        if (right.isBomb) {
            this.neighborBombs++;
        }
    }
    var upperRight = this.getNeighborAt("upperRight", grid);
    if (upperRight) {
        if (upperRight.isBomb) {
            this.neighborBombs++;
        }
    }
    var upperLeft = this.getNeighborAt("upperLeft", grid);
    if (upperLeft) {
        if (upperLeft.isBomb) {
            this.neighborBombs++;
        }
    }
    var lowerLeft = this.getNeighborAt("lowerLeft", grid);
    if (lowerLeft) {
        if (lowerLeft.isBomb) {
            this.neighborBombs++;
        }
    }
    var lowerRight = this.getNeighborAt("lowerRight", grid);
    if (lowerRight) {
        if (lowerRight.isBomb) {
            this.neighborBombs++;
        }
    }
}

Square.prototype.toggleFlagged = function() {
    this.flagged = this.flagged ? false : true;
}

Square.prototype.click = function(match) {
    if (match.flagMode) {
        //alert("flagMode On");
        this.toggleFlagged();
    }
    else {
        //alert("flagMode Off");
        match.unveilSquare(this);
    }
    //alert("flagged = " + this.flagged);
}

Square.prototype.toString = function() {
    if (this.isBomb) {
        return "B";
    }
    else {
        return this.neighborBombs;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////  GRID  ////////////////////////////////////////////////////////////
//constructor
function Grid(rows, columns, numBombs) {
    rows = parseInt(rows);
    columns = parseInt(columns);
    numBombs = parseInt(numBombs);
    if (rows >= 10) {
        if (rows >= 40) {
            this.rows = 40;
        }
        else {
            this.rows = rows;
        }
    }
    else {
        this.rows = 10;
    }
    if (columns >= 10) {
        if (columns >= 40) {
            this.columns = 40;
        }
        else {
            this.columns = columns;
        }
    }
    else {
        this.columns = 10;
    }
    if (numBombs >= 10) {
        if (numBombs >= 40) {
            this.numBombs = 40;
        }
        else {
            this.numBombs = numBombs;
        }
    }
    else {
        this.numBombs = 10;
    }
    
    
    //replace the matrix with an object
    this.matrix = {};
    for (var i = 1; i <= this.rows ; i++) {
        for (var j = 1; j <= this.columns; j++) {
            var position = new Position(i, j);
            this.matrix[position.toString()] = new Square(false, position);
        }
    }
}

//methods
Grid.prototype.getDimensions = function() {
    return this.rows+"X"+this.columns;
}

Grid.prototype.getSquareAtPosition = function(position) {
    return this.matrix[position.toString()];
}

Grid.prototype.insertBombs = function() {
    var bombs = this.numBombs;
    while (bombs > 0) {
        var position = new Position(getRandomIntInclusive(1, this.rows), getRandomIntInclusive(1, this.columns));
        var square = this.getSquareAtPosition(position);
        if (!square.isBomb) {
            square.isBomb = true;
            bombs--;
        } 
    }
}

Grid.prototype.setSquaresNeighborBombs = function() {
    for (var i = 1; i <= this.rows ; i++) {
        for (var j = 1; j <= this.columns; j++) {
            var square = this.getSquareAtPosition(new Position(i, j));
            square.setNeighborBombs(this);
        }
    }
}

Grid.prototype.fill = function() {
    this.insertBombs();
    this.setSquaresNeighborBombs();
}

Grid.prototype.drawGrid = function(elem) {
    for (var i = 1; i <= this.rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 1; j <= this.columns; j++) {
            var td = document.createElement("td");
            td.className = "square";
            var square = this.getSquareAtPosition(new Position(i, j));
            td.value = square;
            var text = document.createTextNode(square.toString());
            td.appendChild(text);
            td.className += " _" + square.toString();
            var btn = document.createElement("button");
            btn.className = "gridButton";
            td.appendChild(btn);
            tr.appendChild(td);
        }
        elem.appendChild(tr);
    }
}

Grid.prototype.toString = function() {
    var str = "{\n";
    for (var i = 1; i <= this.rows; i++) {
        str += "[";
        for (var j = 1; j <= this.columns; j++) {
            if (j !== this.columns) {
                str += this.getSquareAtPosition(new Position(i, j)) + ", ";
            }
            else {
                str += this.getSquareAtPosition(new Position(i, j)) + " ]\n";
            }
        }
    }
    str += "}";
    return str;
}
////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////  MATCH  //////////////////////////////////////////////////////////////////
//constructor
function Match(gridDimension, numBombs) {
    //this.gridDimension = gridDimension;
    //this.numBombs = numBombs;
    this.numFlags = numBombs;
    this.unveiledSquares = 0;
    this.time = 0;
    this.status = "idle";
    this.flagMode = false;
    var dimensions = gridDimension.split(/x/i);
    this.grid = new Grid(dimensions[0], dimensions[1], numBombs);
    this.grid.fill();
}

//methods
Match.prototype.start = function() {
    this.intervalId = setInterval(function(){this.time++;}, 1000);
    this.status = "running";
}

Match.prototype.stop = function() {
    clearInterval(this.intervalId);
    this.status = "stopped";
}

Match.prototype.toggleFlagMode = function() {
    this.flagMode = this.flagMode ? false : true;
}

Match.prototype.end = function(result) {
    if (this.status === "running") {
        //clearInterval(this.intervalId); //clearInterval to stop counting the time
    }
    this.status = "ended";
    alert(result);
}

//check if the square unveiled ends the match
Match.prototype.checkMove = function(square) { //square is the last square clicked or unveiled
    var notBombSquares = (this.grid.columns*this.grid.rows) - this.grid.numBombs;
    if (this.unveiledSquares === notBombSquares) {
        this.end("Success!");
    }
}

Match.prototype.unveilSquare = function(square) {
    if (square.unveiled) {
        return;
    }
    square.unveiled = true;
    //alert("unveiled " + square);
    if (square.isBomb) {
        return this.end("Boom!");
    }
    this.unveiledSquares++;
    if (square.neighborBombs === 0) {    
        var up = square.getNeighborAt("up", this.grid);
        if (up) {
            if (!up.unveiled) {
                this.unveilSquare(up);
            }
        }
        var down = square.getNeighborAt("down", this.grid);
        if (down) {
            if (!down.unveiled) {
                this.unveilSquare(down);
            }
        }
        var left = square.getNeighborAt("left", this.grid);
        if (left) {
            if (!left.unveiled) {
                this.unveilSquare(left);
            }
        }
        var right = square.getNeighborAt("right", this.grid);
        if (right) {
            if (!right.unveiled) {
                this.unveilSquare(right);
            }
        }
        var upperRight = square.getNeighborAt("upperRight", this.grid);
        if (upperRight) {
            if (!upperRight.unveiled) {
                this.unveilSquare(upperRight);
            }
        }
        var upperLeft = square.getNeighborAt("upperLeft", this.grid);
        if (upperLeft) {
            if (!upperLeft.unveiled) {
                this.unveilSquare(upperLeft);
            }
        }
        var lowerLeft = square.getNeighborAt("lowerLeft", this.grid);
        if (lowerLeft) {
            if (!lowerLeft.unveiled) {
                this.unveilSquare(lowerLeft);
            }
        }
        var lowerRight = square.getNeighborAt("lowerRight", this.grid);
        if (lowerRight) {
            if (!lowerRight.unveiled) {
                this.unveilSquare(lowerRight);
            }
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////