// Script

var screen = document.querySelector('canvas');
var pencil = screen.getContext('2d');

var blueVectorX = document.getElementById('BlueVectorX');
var blueVectorY = document.getElementById('BlueVectorY');
var blueVectorMagnitude = document.getElementById('BlueVectorMagnitude');
var blueVectorAngle = document.getElementById('BlueVectorAngle');

var orangeVectorY = document.getElementById('OrangeVectorY');
var orangeVectorX = document.getElementById('OrangeVectorX');
var orangeVectorMagnitude = document.getElementById('OrangeVectorMagnitude');
var orangeVectorAngle = document.getElementById('OrangeVectorAngle');

var resultantVectorY = document.getElementById('ResultantVectorY');
var resultantVectorX = document.getElementById('ResultantVectorX');
var resultantVectorMagnitude = document.getElementById('ResultantVectorMagnitude');
var resultantVectorAngle = document.getElementById('ResultantVectorAngle');


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


var relPosBlueArrowX, relPosBlueArrowY, relMagnitudeBlueArrow, relAngleBlueArrow;
var relPosOrangeArrowX, relPosOrangeArrowY, relMagnitudeOrangeArrow,  relAngleOrangeArrow;
var relPosResultantX, relPosResultantY, relMagnitudeResultant, relAngleResultant;

function calculateVectors(){
    relPosBlueArrowX = BlueArrowX - HalfScreenWidth;
    relPosBlueArrowY = HalfScreenHeight - BlueArrowY;
    relMagnitudeBlueArrow = Math.sqrt(Math.pow(relPosBlueArrowX,2) + Math.pow(relPosBlueArrowY,2))
    relAngleBlueArrow = Math.atan2(relPosBlueArrowY, relPosBlueArrowX) * 180 / Math.PI;
    blueVectorMagnitude.value = relMagnitudeBlueArrow.toString();
    blueVectorAngle.value = relAngleBlueArrow.toString();
    blueVectorX.value = relPosBlueArrowX.toString();
    blueVectorY.value = relPosBlueArrowY.toString();
    
    relPosOrangeArrowX = OrangeArrowX - HalfScreenWidth;
    relPosOrangeArrowY = HalfScreenHeight - OrangeArrowY;
    relMagnitudeOrangeArrow = Math.sqrt(Math.pow(relPosOrangeArrowX,2) + Math.pow(relPosOrangeArrowY,2))
    relAngleOrangeArrow = Math.atan2(relPosOrangeArrowY, relPosOrangeArrowX) * 180 / Math.PI;
    orangeVectorMagnitude.value = relMagnitudeOrangeArrow.toString();
    orangeVectorAngle.value = relAngleOrangeArrow.toString();
    orangeVectorX.value = relPosOrangeArrowX.toString();
    orangeVectorY.value = relPosOrangeArrowY.toString();
}

function calculateResultant() {
    relPosResultantX = resultantX - HalfScreenWidth;
    relPosResultantY = HalfScreenHeight - resultantY;
    relMagnitudeResultant = Math.sqrt(Math.pow(relPosResultantX,2) + Math.pow(relPosResultantY,2))
    relAngleResultant = Math.atan2(relPosResultantY, relPosResultantX) * 180 / Math.PI;
    resultantVectorMagnitude.value = relMagnitudeResultant.toString();
    resultantVectorAngle.value = relAngleResultant.toString();
    resultantVectorX.value = relPosResultantX.toString();
    resultantVectorY.value = relPosResultantY.toString();
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

var holdMouse = false;

var onBlueArrow = false;
var onOrangeArrow = false;

var resultantX = HalfScreenWidth + 100;
var resultantY = HalfScreenHeight - 100;

calculateVectors();
calculateResultant()

drawArrow(pencil, HalfScreenWidth, HalfScreenHeight, resultantX, resultantY, 'green');

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
        resultantX = HalfScreenWidth + relPosBlueArrowX + relPosOrangeArrowX;
        resultantY = HalfScreenHeight - relPosBlueArrowY + relPosOrangeArrowY;
        calculateResultant();
        drawArrow(pencil, HalfScreenWidth, HalfScreenHeight, resultantX, resultantY, 'green');
    }
}

onmousemove = changeArrows;



