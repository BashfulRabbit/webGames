window.onload=function(){
	canv = document.getElementById("game");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	setInterval(game,1000/10);
}
var xv = 0;
var yv = 0;
var px=py=10; //player position
var gs=20; //grid scale
var ax=ay=15; //apple position
var tail=[];
var tail_size=3;
function game(){
	px+=xv;
	py+=yv;
	if(px<0){
		px=gs-1;
	}
	if(px>gs-1){
		px=0;
	}
	if(py<0){
		py=gs-1;
	}
	if(py>gs-1){
		py=0;
	}
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);

	ctx.fillStyle="green";
	for(var i=0;i<tail.length;i++){
		ctx.fillRect(tail[i].x*gs,tail[i].y*gs,gs-2,gs-2)
		if (tail[i].x==px && tail[i].y==py){
			tail_size = 3;
		}
	}
	tail.push({x:px,y:py});
	while(tail.length>tail_size){
		tail.shift();
	}
	if (ax == px && ay == py){
		tail_size++;
		ax=Math.floor(Math.random()*gs);
		ay=Math.floor(Math.random()*gs);
	}

	ctx.fillStyle="red";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);

}
function keyPush(evt){
	switch(evt.keyCode){
		case 37:
			xv=-1;yv=0;
			break;
		}
	switch(evt.keyCode){
		case 38:
			xv=0;yv=-1;
			break;
		}	
	switch(evt.keyCode){
		case 39:
			xv=1;yv=0;
			break;
		}
	switch(evt.keyCode){
		case 40:
			xv=0;yv=1;
			break;		
	}
}