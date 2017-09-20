//depends on helperFunctions.js

//////////////////////////  POSITION  ////////////////////////////////////////////
//constructor
function Position(row, col, maxRow, maxCol) {
    this.identity = "Position";
    if (typeof row === "number") {
        this.row = row;
    }
    else {
        this.row = 1;
    }
    if (typeof col === "number") {
        this.col = col;
    }
    else {
        this.col = 1;
    }
    if (typeof maxRow === "number") {
        this.maxRow = maxRow;
    }
    else {
        this.maxRow = 10;
    }
    if (typeof maxCol === "number") {
        this.maxCol = maxCol;
    }
    else {
        this.maxCol = 10;
    }
}

//methods

/*
if possible will change the position to the referred neighboring sides 
("up", "down", "left", "right", "upperLeft", "upperRight", "lowerLeft", "lowerRight")
*/
Position.prototype.moveTo = function(side) {

    if (side.indexOf("up") !== -1 && this.row === 1) {
        //first row doesn't have any up ('up', 'upperLeft', 'upperRight') neighbor
        return false;
    }
    
    if (side.indexOf("ow") !== -1 && this.row === this.maxRow) {
        //last row doesn't have any ow ('down', 'lowerLeft', 'lowerRight') neighbor
        return false;
    }
    
    if (side.indexOf("eft") !== -1 && this.col === 1) {
        //first collumn doesn't have any left ('left', 'upperLeft', 'lowerLeft') neighbor
        return false;
    }
    
    if (side.indexOf("ight") !== -1 && this.col === this.maxCol) {
        //first row doesn't have any right ('right', 'upperRight', 'lowerRight') neighbor
        return false;
    }
    
    switch(side) {
        case "up": 
            this.row--;
            break;
        case "down": 
            this.row++;
            break;
        case "left": 
            this.col--;
            break;
        case "right": 
            this.col++;
            break;
        case "upperLeft": 
            this.row--; this.col--;
            break;
        case "upperRight": 
            this.row--; this.col++
            break;
        case "lowerLeft": 
            this.row++; this.col--;
            break;
        case "lowerRight": 
            this.row++; this.col++;
            break;
    }
    
    return true;
}

//returns a new position with the same coordinates
Position.prototype.clone = function() {
    var clonePosition = new Position(this.row, this.col, this.maxRow, this.maxCol);
    return clonePosition;
}

Position.prototype.toString = function() {
    return "(" + this.row + ", " + this.col + ")";
}
/////////////////////////////////////////////////////////////////////////////////


////////////////////////////  SQUARE  ////////////////////////////////////////////////////////////////
//constructor
function Square(isBomb, position) {
    this.identity = "Square";
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

Square.prototype.toggleFlagged = function() {
    this.flagged = toggleState(this.flagged);
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
    this.indentity = "Grid";
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
            var position = new Position(i, j, this.rows, this.columns);
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

Grid.prototype.getSquareNeighbor = function(square, side) {
    var pos = square.position.clone();
    if (pos.moveTo(side)) {
        return this.getSquareAtPosition(pos);
    }
    else {
        return false;
    }
}

Grid.prototype.setSquareNeighborBombs = function(square) {
    var up = this.getSquareNeighbor(square, "up");
    if (up) {
        if (up.isBomb) {
            square.neighborBombs++;
        }
    }
    var down = this.getSquareNeighbor(square, "down");
    if (down) {
        if (down.isBomb) {
            square.neighborBombs++;
        }
    }
    var left = this.getSquareNeighbor(square, "left");
    if (left) {
        if (left.isBomb) {
            square.neighborBombs++;
        }
    }
    var right = this.getSquareNeighbor(square, "right");
    if (right) {
        if (right.isBomb) {
            square.neighborBombs++;
        }
    }
    var upperRight = this.getSquareNeighbor(square, "upperRight");
    if (upperRight) {
        if (upperRight.isBomb) {
            square.neighborBombs++;
        }
    }
    var upperLeft = this.getSquareNeighbor(square, "upperLeft");
    if (upperLeft) {
        if (upperLeft.isBomb) {
            square.neighborBombs++;
        }
    }
    var lowerLeft = this.getSquareNeighbor(square, "lowerLeft");
    if (lowerLeft) {
        if (lowerLeft.isBomb) {
            square.neighborBombs++;
        }
    }
    var lowerRight = this.getSquareNeighbor(square, "lowerRight");
    if (lowerRight) {
        if (lowerRight.isBomb) {
            square.neighborBombs++;
        }
    }
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
    var position = new Position(1, 1, this.rows, this.columns);
    for (var i = 1; i <= this.rows ; i++) {
        for (var j = 1; j <= this.columns; j++) {
            position.row = i; position.col = j;
            var square = this.getSquareAtPosition(position);
            this.setSquareNeighborBombs(square);
        }
    }
}

Grid.prototype.fill = function() {
    this.insertBombs();
    this.setSquaresNeighborBombs();
}

Grid.prototype.toString = function() {
    var str = "{\n";
    var position = new Position(1, 1, this.rows, this.columns);
    for (var i = 1; i <= this.rows; i++) {
        str += "[";
        for (var j = 1; j <= this.columns; j++) {
            position.row = i; position.col = j;
            if (j !== this.columns) {
                str += this.getSquareAtPosition(position) + ", ";
            }
            else {
                str += this.getSquareAtPosition(position) + " ]\n";
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
    if (typeof gridDimension !== "string") {
        gridDimension = "10x10";
    }
    if (typeof numBombs !== "number") {
        numBombs = 10;
    }
    this.indentity = "Match";
    this.numFlags = numBombs;
    this.unveiledSquares = 0;
    this.time = 0;
    this.clockId = 0;
    this.status = "idle";
    this.flagMode = false;
    this.user = {
        name : ""
    }
    var dimensions = gridDimension.split(/x/i);
    this.grid = new Grid(dimensions[0], dimensions[1], numBombs);
    this.grid.fill();
}

//methods

//start the match
Match.prototype.start = function() {
    var match = this;
    match.clockId = setInterval(function(){
        match.time++;
    }, 1000);
    match.status = "running";
}

//pause the match
Match.prototype.stop = function() {
    clearInterval(this.clockId);
    this.status = "stopped";
}

Match.prototype.toggleFlagMode = function() {
    this.flagMode = toggleState(this.flagMode);
}

//end the match with the result as an argument
Match.prototype.end = function(result) {
    if (this.status === "running") {
        clearInterval(this.clockId); //clearInterval to stop counting the time
    }
    this.status = "ended";
    this.endedWith = result;
}

//check if the match has ended
Match.prototype.checkStatus = function() {
    var notBombSquares = (this.grid.columns*this.grid.rows) - this.grid.numBombs;
    if (this.unveiledSquares === notBombSquares) {
        this.end("success");
    }
}

//unveils the specified square
Match.prototype.unveilSquare = function(square) {
    if (square.unveiled || square.flagged) {
        return;
    }
    square.unveiled = true;
    //alert("unveiled " + square);
    if (square.isBomb) {
        return this.end("failed");
    }
    this.unveiledSquares++;
    if (square.neighborBombs === 0) {    
        var up = this.grid.getSquareNeighbor(square, "up");
        if (up) {
            if (!up.unveiled) {
                this.unveilSquare(up);
            }
        }
        var down = this.grid.getSquareNeighbor(square, "down");
        if (down) {
            if (!down.unveiled) {
                this.unveilSquare(down);
            }
        }
        var left = this.grid.getSquareNeighbor(square, "left");
        if (left) {
            if (!left.unveiled) {
                this.unveilSquare(left);
            }
        }
        var right = this.grid.getSquareNeighbor(square, "right");
        if (right) {
            if (!right.unveiled) {
                this.unveilSquare(right);
            }
        }
        var upperRight = this.grid.getSquareNeighbor(square, "upperRight");
        if (upperRight) {
            if (!upperRight.unveiled) {
                this.unveilSquare(upperRight);
            }
        }
        var upperLeft = this.grid.getSquareNeighbor(square, "upperLeft");
        if (upperLeft) {
            if (!upperLeft.unveiled) {
                this.unveilSquare(upperLeft);
            }
        }
        var lowerLeft = this.grid.getSquareNeighbor(square, "lowerLeft");
        if (lowerLeft) {
            if (!lowerLeft.unveiled) {
                this.unveilSquare(lowerLeft);
            }
        }
        var lowerRight = this.grid.getSquareNeighbor(square, "lowerRight");
        if (lowerRight) {
            if (!lowerRight.unveiled) {
                this.unveilSquare(lowerRight);
            }
        }
    }
}

//actions to perform when the square is clicked
Match.prototype.clickSquare = function(square) {
    if (this.flagMode) {
        square.toggleFlagged();
        //if the operation was to flag a Square then decrease the number of flags left
        if (square.flagged) {
            this.numFlags--;
        }
        //the oposite of the above
        else {
            this.numFlags++;
        }
    }
    else if (!square.flagged) {
        this.unveilSquare(square);
    }
}

//returns a clone of the Match Object
Match.prototype.clone = function() {
    var dimesions = this.grid.rows + "x" + this.grid.columns;
    var numBombs = this.grid.numBombs;
    var clone = new Match(dimesions, numBombs);
    clone.unveiledSquares = this.unveiledSquares;
    clone.time = this.time;
    clone.status = this.status;
    clone.flagMode = this.flagMode;
    clone.grid = this.grid;
    return clone;
}
////////////////////////////////////////////////////////////////////////////////////////////////