var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 4;
var ballSpeedY = 4;
var peddle1Y = 250;
var peddle2Y = 250;
var p1_score = 0;
var p2_score = 0;
const PEDDEL_HEIGHT = 100;

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		 x: mouseX,
		 y: mouseY
	}
}


window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 30;
	setInterval(function(){
		movement();
		drawInitialBlocks();
	}, 1000/framesPerSecond);
	canvas.addEventListener('mousemove',function(evt){
		var mousePos = calculateMousePos(evt);
		peddle1Y = mousePos.y - (PEDDEL_HEIGHT/2);
	})
}
//draw a circle
function drawBall(){
		canvasContext.fillStyle ='rgb(255,255,255)';
		canvasContext.beginPath();
		//arc(startX,startY,radius,radians,degree,cw||ccw)
		canvasContext.arc(ballX,ballY,10,0,Math.PI*2,true);
		canvasContext.fill();
}
//draw the background
function drawBackground(){
	canvasContext.fillStyle ='rgb(0,0,0)';
	canvasContext.fillRect(0,0,canvas.width,canvas.height);
}
//draw a peddel that starts at (leftX,topY) with certian color;
function drawAPeddel(leftX,topY,width,height,color){
	canvasContext.fillStyle =color;
	canvasContext.fillRect(leftX,topY,width,height);
}

function ballRest(){
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	ballSpeedX = -ballSpeedX;
}
function movement(){
	ballX+=ballSpeedX;
	ballY+=ballSpeedY;
	if (ballX<0){
		if(ballY > peddle1Y && 
		   ballY < peddle1Y+PEDDEL_HEIGHT){
		ballSpeedX = -ballSpeedX;
		}else{
			p2_score++;
			ballRest();
		}
	}
	if (ballX>canvas.width-10){
		if(ballY > peddle2Y && 
		   ballY < peddle2Y+PEDDEL_HEIGHT){
		ballSpeedX = -ballSpeedX;
		}else{
			p1_score++;
			ballRest();
		}	
	}
	if (ballY>canvas.height || ballY<0){
		ballSpeedY = -ballSpeedY;
	}
	if (peddle2Y+(PEDDEL_HEIGHT/2) < ballY+20){
		peddle2Y+=3.7;
	}else if (peddle2Y+(PEDDEL_HEIGHT/2) > ballY-20){
		peddle2Y-=3.7;
	}

}
function drawInitialBlocks(){
	movement();
	drawBackground();
	//left peddel
	drawAPeddel(0,peddle1Y,10,PEDDEL_HEIGHT,'rgb(255,255,255)');
	//right peddel
	drawAPeddel(canvas.width-10,peddle2Y,10,PEDDEL_HEIGHT,'rgb(255,255,255)');
	drawBall();
	canvasContext.fillText(p1_score, 100, 100);
	canvasContext.fillText(p2_score, canvas.width-100,100);
}