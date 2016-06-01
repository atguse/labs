var paddle1;
var paddle2;
var score;
var ball;
var line;
var ps1;
var ps2;
var mysound;
var winsound;
x=Math.random();

window.onload=function(){
	var sb=document.getElementById("StartButton");
	sb.onclick=function(){startGame()};
}

function startGame(){
	paddle1=new component(5,50,"black",40,115);
	paddle2=new component(5,50,"red",435,115);
	line=new component(490,2,"black",0,280);
	score=new component("30px","Consolas","black",200,320,"text");
	ball=new component(5,5,"blue",237.5,137.5);
	mysound=new sound("bounce.mp3");
	winsound=new sound("applause3.mp3");
	area.start();
}

var area={
	canvas: document.createElement("canvas"),
    start: function(){
		document.getElementById("SplashScreen").style.display='none';
        this.canvas.width=480;
        this.canvas.height=340;
        this.context=this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		ps1=0;
		ps2=0;
        this.interval=setInterval(updateArea, 15);
		window.addEventListener('keydown',function(e){
											area.keys=(area.keys || []);
											area.keys[e.keyCode]=(e.type=="keydown");
											})
        window.addEventListener('keyup',function(e){
											area.keys[e.keyCode] = (e.type == "keydown");
											})
        },
	stop: function(){
        clearInterval(this.interval);
		},    
	clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
}

function component(width,height,color,x,y,type){
	this.type=type;
	this.width=width;
	this.height=height;
	this.speedX=0;
	this.speedY=0;
	this.x=x;
	this.y=y;
	this.update=function(){
		ctx=area.context;
		if(this.type=="text"){
			ctx.font=this.width + " " + this.height;
			ctx.fillStyle=color;
			ctx.fillText(this.text,this.x,this.y);
		}
		else{
			ctx.fillStyle=color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}
	this.newPos=function(){
		this.x+=this.speedX;
		this.y+=this.speedY;
		this.hit();
	}
	this.hit=function(){
		var down=280-this.height;
		var up=0;
		if(this.height==50){
			if(this.y>down) this.y=down;
			else if(this.y<up) this.y=up;
		}
		else if(this.height==5)
			  if(this.y>down || this.y<up) {this.speedY=-this.speedY; mysound.play();}
			  
	}
	this.collision=function(paddle){
		var bleft=this.x;
		var bright=this.x+this.width;
		var btop=this.y;
		var bbottom=this.y+this.height;
		var pleft=paddle.x;
		var pright=paddle.x+paddle.width;
		var ptop=paddle.y;
		var pbottom=paddle.y+paddle.height;
		var col=false;
		var down=280;
		var up=0;
		if(pleft==40) {if((bleft<=pright) && ((btop>=ptop-1) && (bbottom<=pbottom+1))) col=true;
					   else if(pbottom==down && bleft<=pright && btop>=ptop) col=true;
					   else if(ptop==up && bleft<=pright && bbottom<=pbottom) col=true;}
		else if(pleft==435) {if((bright>=pleft) && ((btop-1>=ptop) && (bbottom<=pbottom+1))) col=true;
							 else if(pbottom==down && bright>=pleft && btop>=ptop-1) col=true;
							 else if(ptop==up && bright>=pleft && bbottom<=pbottom+1) col=true;}
		return col;
	}
}

function sound(src){
    this.sound=document.createElement("audio");
    this.sound.src=src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display="none";
    document.body.appendChild(this.sound);
    this.play=function(){
        this.sound.play();
    }
}

function updateArea(){
	if(ball.collision(paddle1)) {ball.speedX=-ball.speedX; ball.x=paddle1.x+paddle1.width; mysound.play();
								 if(Math.random()<0.5) ball.speedY+=1;
								 else ball.speedY-=1;}
	else if(ball.collision(paddle2)) {ball.speedX=-ball.speedX; ball.x=paddle2.x-ball.width; mysound.play();
									  if(Math.random()<0.5) ball.speedY+=1;
									  else ball.speedY-=1;}
	var pp=0;
	if(ball.x<(paddle1.x+paddle1.width)) {ps2+=1; pp=1;}
	else if((ball.x+ball.width)>paddle2.x) {ps1+=1; pp=1;}
	area.clear();
	if(ps1>=10) {score.text="Player 1 Wins!"; winsound.play(); area.stop();}
	else if(ps2>=10) {score.text="Player 2 Wins!"; winsound.play(); area.stop();}
	else{
	if(ball.speedY==0 && ball.speedX==0){
		if(x<0.25) {ball.speedX=2; ball.speedY=2;}
		else if(x<0.5) {ball.speedX=2; ball.speedY=-2;}
		else if(x<0.75) {ball.speedX=-2; ball.speedY=2;}
		else {ball.speedX=-2; ball.speedY=-2;}
		}
	paddle1.speedY=0;
	paddle2.speedY=0;
	if (area.keys && area.keys[83]) paddle1.speedY=3;
	if (area.keys && area.keys[87])	paddle1.speedY=-3;
	if (area.keys && area.keys[38]) paddle2.speedY=-3;
    if (area.keys && area.keys[40]) paddle2.speedY=3;
	if(pp==0){
		ball.newPos();
		ball.update();
		paddle1.newPos();
		paddle2.newPos();
		paddle1.update();
		paddle2.update();
	}
	else{
		x=Math.random();
		ball=new component(5,5,"blue",237.5,137.5);
		paddle1=new component(5,50,"black",40,115);
		paddle2=new component(5,50,"red",435,115);
	}
	score.text=ps1 + " - " + ps2;
	line.update();}
	score.update();
}
//adauga AI, butoane single si multi