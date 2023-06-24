// Script

var screen = document.querySelector('canvas');
var pencil = screen.getContext('2d');

var HalfScreenWidth = screen.width/2;
var HalfScreenHeight = screen.height/2;

function drawScreen(context) {
    context.fillStyle = 'black';
    context.fillRect(0, 0, screen.width, screen.height);
}

function clearScreen() {
    pencil.clearRect(0, 0, screen.width, screen.height);
}

function drawGrid(context, spaceBetween, gridWidth, gridHeight) {
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = 'gray';

    for (var i = spaceBetween; i < gridWidth; i+=spaceBetween) {
        context.moveTo(i,0);
        context.lineTo(i,gridHeight);
        context.stroke();
    }

    for (var i = spaceBetween; i < gridHeight; i+=spaceBetween) {
        context.moveTo(0,i);
        context.lineTo(gridWidth, i);
        context.stroke();
    }
    context.closePath();
}

function drawCenterDot(context){
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(screen.width/2, screen.height/2, 6, 0, 2 * 3.14);
    context.fill();
}

function drawArrowHead(context, tox, toy, fromx, fromy, radius, color) {
    var x_center = tox;
    var y_center = toy;
    
    var angle;
    var x;
    var y;

    context.beginPath();
    context.fillStyle = color;

    angle = Math.atan2(toy - fromy, tox - fromx)
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;

    context.moveTo(x, y);

    angle += (1.0/3.0) * (2 * Math.PI)
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	context.lineTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius *Math.cos(angle) + x_center;
	y = radius *Math.sin(angle) + y_center;

    context.lineTo(x, y);

	context.closePath();

	context.fill();
}

function drawArrow(context, startX, startY, endX, endY, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 5;

    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.closePath();

    context.stroke();
    

    drawArrowHead(pencil, endX, endY, startX, startY, 10, color)
}

function resetScreen() {
    clearScreen();
    drawScreen(pencil);
    drawGrid(pencil, gridSpace, screen.width, screen.height);
}

function calculateVectors(){
    relPosBlueArrowX = BlueArrowX - HalfScreenWidth;
    relPosBlueArrowY = HalfScreenHeight - BlueArrowY;

    relAngleBlueArrow = Math.atan2(relPosBlueArrowY, relPosBlueArrowX) * 180 / Math.PI;

    relPosOrangeArrowX = OrangeArrowX - HalfScreenWidth;
    relPosOrangeArrowY = HalfScreenHeight - OrangeArrowY;

    relAngleOrangeArrow = Math.atan2(relPosOrangeArrowY, relPosOrangeArrowX) * 180 / Math.PI;

    resultantVectorX = relPosBlueArrowX + relPosOrangeArrowX + HalfScreenWidth;
    resultantVectorY = HalfScreenHeight - relPosBlueArrowY - relPosOrangeArrowY;

    resultantVectorValue = Math.sqrt(Math.pow(resultantVectorX,2) + Math.pow(resultantVectorY,2))
    resultantVectorAngle = Math.atan2(resultantVectorY, resultantVectorX) * 180 / Math.PI;
}

drawScreen(pencil);
var gridSpace = 100;
drawGrid(pencil, gridSpace, screen.width, screen.height);

var BlueArrowX = HalfScreenWidth + 0;
var BlueArrowY = HalfScreenHeight - 100;
drawArrow(pencil, HalfScreenWidth, HalfScreenHeight, BlueArrowX, BlueArrowY, 'blue');

var OrangeArrowX = HalfScreenWidth + 100;
var OrangeArrowY = HalfScreenHeight + 0;
drawArrow(pencil, HalfScreenWidth, HalfScreenHeight, OrangeArrowX, OrangeArrowY, 'orange');

drawCenterDot(pencil);

var relPosBlueArrowX = BlueArrowX - HalfScreenWidth;
var relPosBlueArrowY = HalfScreenHeight - BlueArrowY;

var relAngleBlueArrow = Math.atan2(relPosBlueArrowY, relPosBlueArrowX) * 180 / Math.PI;

var relPosOrangeArrowX = OrangeArrowX - HalfScreenWidth;
var relPosOrangeArrowY = HalfScreenHeight - OrangeArrowY;

var relAngleOrangeArrow = Math.atan2(relPosOrangeArrowY, relPosOrangeArrowX) * 180 / Math.PI;

var resultantVectorX = relPosBlueArrowX + relPosOrangeArrowX + HalfScreenWidth;
var resultantVectorY = HalfScreenHeight - relPosBlueArrowY + relPosOrangeArrowY;

var resultantVectorValue = Math.sqrt(Math.pow(resultantVectorX,2) + Math.pow(resultantVectorY,2))
var relAngleOrangeArrow = Math.atan2(resultantVectorY, resultantVectorX) * 180 / Math.PI;

drawArrow(pencil, HalfScreenWidth, HalfScreenHeight, resultantVectorX, resultantVectorY, 'green');

var holdMouse = false;

var onBlueArrow = false;
var onOrangeArrow = false;

screen.onmousedown = function(e) {
    var x = e.pageX - screen.offsetLeft;
    var y = e.pageY - screen.offsetTop;

    if((x > BlueArrowX - 10 && x < BlueArrowX + 10) && (y > BlueArrowY - 10 && y < BlueArrowY + 10)){
        onBlueArrow = true;
    }else{
        onBlueArrow = false;
    }

    if((x > OrangeArrowX - 10 && x < OrangeArrowX + 10) && (y > OrangeArrowY - 10 && y < OrangeArrowY + 10)){
        onOrangeArrow = true;
    }else{
        onOrangeArrow = false;
    }

    holdMouse = true;
}

screen.onmouseup = function() {
    holdMouse = false;
}

function changeArrows(e) {

    var x = e.pageX - screen.offsetLeft;
    var y = e.pageY - screen.offsetTop;

    if(holdMouse) {
        if(onBlueArrow) {
            BlueArrowX = x;
            BlueArrowY = y;
        }else{
            if(onOrangeArrow) {
                OrangeArrowX = x;
                OrangeArrowY = y;
            }
        }

        resetScreen();
        drawArrow(pencil, HalfScreenWidth, HalfScreenHeight, BlueArrowX, BlueArrowY, 'blue');
        drawArrow(pencil, HalfScreenWidth, HalfScreenHeight, OrangeArrowX, OrangeArrowY, 'orange');
        drawCenterDot(pencil);
        calculateVectors();
        drawArrow(pencil, HalfScreenWidth, HalfScreenHeight, resultantVectorX, resultantVectorY, 'green');
    }
}

onmousemove = changeArrows;



