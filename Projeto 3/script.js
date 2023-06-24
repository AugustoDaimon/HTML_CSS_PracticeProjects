// Script

var screen = document.querySelector('canvas');
var pencil = screen.getContext('2d');

function drawScreen(context) {
    context.fillStyle = '#1b1c7c';
    context.fillRect(0, 0, screen.width, screen.height);
}

class gridSlot {
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
        if(this.occupiedBy == null) {
            this.context.fillStyle = '#949494';
            this.context.beginPath();
            this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
            this.context.fill();
            this.context.lineWidth = 5;
            this.context.strokeStyle = 'black';
            this.context.stroke();
            this.context.closePath();
            console.log('foi x:' + this.centerX + " - y:" + this.centerY);
        }else{
            if(this.occupiedBy == 'Red') {

            }else {

            }
        }
    }
}

verticalMargin = 25;

var gameGrid = [
    
];

drawScreen(pencil);

for (let c = 0; c < 7; c++) {
    for (let r = 0; r < 6; r++) {
        var second = new gridSlot(c, r, 50, 15, 40, 15, pencil);
        second.drawSlot();
    }
}



