// Script

var screen = document.querySelector('canvas');
var pencil = screen.getContext('2d');

function drawScreen(context) {
    context.fillStyle = '#1b1c7c';
    context.fillRect(0, 0, screen.width, screen.height);
}

function generateScreen(grid) {
    drawScreen(pencil);

    grid.drawGrid();
}

class grid {
    constructor(marginX, marginY, slotSize, gridSpace, context) {
        this.marginX = marginX;
        this.marginY = marginY;
        this.size = slotSize;
        this.space = gridSpace;
        this.context = context;

        this.gridSlots = new Array(7);

        for (var i = 0; i < this.gridSlots.length; i++) {
            this.gridSlots[i] = new Array(6);
        }

        for (let c = 0; c < 7; c++) {
            for (let r = 0; r < 6; r++) {
                this.gridSlots[c][r] = new slot(c, r, this.marginX, this.marginY, this.size, this.space, this.context);
                this.gridSlots[c][r].drawSlot();
            }
        }
    }

    drawGrid() {
        for (let c = 0; c < 7; c++) {
            for (let r = 0; r < 6; r++) {
                this.gridSlots[c][r].drawSlot();
            }
        }
    }
}

class slot {
    constructor(column, row, marginX, marginY, radius, space, context) {
        this.occupiedBy = null;
        this.column = column;
        this.row = row;
        this.radius = radius;
        this.centerX = marginX + (column * radius * 2) + (column * space) + radius;
        this.centerY = screen.height - (space + (row * radius * 2) + (row * space) + radius) - marginY;
        this.context = context;
    }

    drawSlot() {
        if (this.occupiedBy == 'Yellow') {
            this.context.fillStyle = 'Yellow';
        } else {
            if (this.occupiedBy == 'Red') {
                this.context.fillStyle = 'Red';
            } else {
                this.context.fillStyle = '#949494';
            }
        }
        this.context.beginPath();
        this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.lineWidth = 5;
        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.closePath();
    }
}

horizontalMargin = 50;
verticalMargin = 15;
slotSize = 40;
spaceBetween = 15;

var gameGrid = new grid(horizontalMargin, verticalMargin, slotSize, spaceBetween, pencil);
generateScreen(gameGrid);

var selectedSlot = -1;
var turnColorIsRed;
var turnCount = 0;

function returnTurnColor(nTurn) {
    if (nTurn % 2 == 0) {
        return 'Red';
    } else {
        return 'Yellow';
    }
}

function mouseIsInGrid(evento) {
    var x = evento.pageX - screen.offsetLeft + screen.width / 2;
    var y = evento.pageY - screen.offsetTop + screen.height / 2;
    //console.log(x,y);
    if (!inAnimation)
        if ((x > horizontalMargin) && (x < screen.width - horizontalMargin) &&
            (y > verticalMargin) && (y < screen.height - verticalMargin)) {

            for (let c = 0; c < 7; c++) {
                if ((x > (gameGrid.gridSlots[c][5].centerX - gameGrid.gridSlots[c][5].radius)) &&
                    (x < (gameGrid.gridSlots[c][5].centerX + gameGrid.gridSlots[c][5].radius))) {

                    gameGrid.gridSlots[c][5].occupiedBy = returnTurnColor(turnCount);
                    generateScreen(gameGrid);
                    selectedSlot = c;
                } else {
                    gameGrid.gridSlots[c][5].occupiedBy = 'null';
                    generateScreen(gameGrid);
                }
            }
        } else {
            for (let c = 0; c < 7; c++) {
                gameGrid.gridSlots[c][5].occupiedBy = 'null';
            }
            selectedSlot = -1;
            generateScreen(gameGrid);
        }
}

onmousemove = mouseIsInGrid;

screen.onclick = mouseIsClicked;

var inAnimation;

function mouseIsClicked() {
    // Needs fix on multiple clicking at the same time bug
    var clickedSlot = selectedSlot;
    if (clickedSlot >= 0 && !inAnimation) {
        var actualRow = 4;
        var toRow = findFirstOccupiedRow(clickedSlot);
        //console.log(toRow);
        if (gameGrid.gridSlots[clickedSlot][actualRow].occupiedBy != null) {
            //console.log("B");
        } else {
            inAnimation = true;
            const animationFunction = setInterval(() => {
                //console.log(actualRow);
                gameGrid.gridSlots[clickedSlot][actualRow].occupiedBy = returnTurnColor(turnCount);
                gameGrid.gridSlots[clickedSlot][actualRow + 1].occupiedBy = null;
                generateScreen(gameGrid);

                actualRow--;
                if (actualRow < toRow) {
                    clearInterval(animationFunction);
                    checkingForWin(clickedSlot, toRow);
                    inAnimation = false;
                    turnCount++;
                }
            }, 150)
        }
    }
}

function findFirstOccupiedRow(searchSlot) {
    for (let i = 4; i > 0; i--) {
        if (gameGrid.gridSlots[searchSlot][i - 1].occupiedBy != null) {
            return i;
        }
    }
    return 0;
}

function checkingForWin(lastPieceColumn, lastPieceRow) {
    console.log(lastPieceColumn, lastPieceRow);
    var x = lastPieceColumn;
    var y = lastPieceRow;

    if (x == 0) {

    }
    if (x == 7) {

    }
    if (y == 0) {

    }
    if (y == 5) {

    }
}

function searchConnectedFour(searchX, searchY, directionX, directionY) {
    var x = searchX, y = searchY;
    var connectedPieces = 1, countedPieces = 1;

    while (countedPieces < 4) {
        x += directionX;
        y += directionY;

        if (gameGrid.gridSlots[x][y].occupiedBy != null) {
            connectedPieces++;
        }
        countedPieces++;
    }
}
