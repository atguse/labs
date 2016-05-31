var score;

var music = new Audio("raw/loop.mp3");
var eat=new Audio("raw/eat.mp3");

var interval;
var bestText = document.getElementById("best");
var timeText = document.getElementById("time");
var canvas = document.getElementById("gameCanvas");
var menu = document.getElementById("menu");
var menu2 = document.getElementById("gameOver");
var ctx = canvas.getContext("2d");
var bg = new Image();
var foodCount = 1;
var foodColor = "yellow";
bg.src="raw/bg.jpg";

var screenW, screenH;

var menu = document.getElementById("menu");

window.onload = function(){
  screenW = window.innerWidth;
  screenH = window.innerHeight;
  canvas.width=screenW;
  canvas.height=screenH;

  var pat=ctx.createPattern(bg,"repeat");
  ctx.fillStyle=pat;
  ctx.fillRect(0,0,screenW,screenH);

  menu2.style.display="none";

  music.load();
  music.loop=true;
  music.play();

  screenDraw();
}

function screenDraw(){
  //ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, screenW, screenH);

  var pat=ctx.createPattern(bg,"repeat");
  ctx.fillStyle=pat;
  ctx.fillRect(0,0,screenW,screenH);

  bestText.innerHTML="Record: "+getCookie();
}

function init(){
  score = 0;
  foodCount = 1;
  foodColor = "yellow";

  music.pause();

  menu.style.display="none";

  var snake, size = 15, speed = 10, game_loop, food;
  var scoreText = document.getElementById("score");

  bestText.innerHTML="Record: "+getCookie();

  function initSnake(){
    var length = 10;
    snake = [];
    for (var i = length - 1; i>=0; i--){
      snake.push({x: i, y: 0});
    }
  }

  function paintSnake(){
    for(var i=0; i<snake.length; i++){
      var s=snake[i];

      //ctx.fillStyle = "white";
      ctx.fillStyle="rgba(255,255,255,0.7)";
      ctx.fillRect(s.x*size, s.y*size, size, size);
    }
  }

  function createFood(){
    food = {x: Math.round(Math.random()* (screenW-size)/size),
            y: Math.round(Math.random()* (screenH-size)/size)
    };
    //console.log(food.x+" "+food.y);
  }

  function drawFood(color){

    ctx.beginPath();
    //ctx.arc(food.x*size,food.y*size,size/2,0,2*Math.PI);
    ctx.arc((size*(2*food.x+1))/2,(size*(2*food.y+1))/2,size/2,0,2*Math.PI);
    ctx.fillStyle=color;
    ctx.fill();
    //ctx.fillRect(food.x*size, food.y*size, size, size);
  }

  function updateSnake(){
    var headX=snake[0].x, headY=snake[0].y;

    document.onkeydown = function(e){
      var key = e.keyCode;
      if (key == 37 && dir !="right") setTimeout(function() {dir = "left";},40);
      else if (key == 38 && dir != "down") setTimeout(function() {dir = "up";},40);
      else if (key == 39 && dir != "left") setTimeout(function() {dir = "right";},40);
      else if (key == 40 && dir != "up") setTimeout(function() {dir = "down";},40);
    }

    if (dir == "right") headX++;
    else if (dir == "left") headX--;
    else if (dir == "up") headY--;
    else if (dir == "down") headY++;

    var tail = snake.pop();
    tail.x=headX;
    tail.y=headY;
    snake.unshift(tail);

    if (headX>=screenW/size || headX <= -1 || headY >= screenH/size || headY <= -1){
      gameover();
    }

    if (headX == food.x && headY==food.y){
      eat.play();
      createFood();
      if (foodColor=="red"){
        for (var i=1;i<=6;i++){
          var tail = {x: headX, y: headY};
          snake.unshift(tail);
        }
        clearInterval(interval);
        score+=30;
        timeText.style.display="none";
      }else{
        for (var i=1;i<=3;i++){
          var tail = {x: headX, y: headY};
          snake.unshift(tail);
        }
        score+=10;
      }

      if (foodCount%3==0) {
        foodColor = "red";
        setTime();
      }
      else foodColor = "yellow";
      foodCount++;

      scoreText.innerHTML="Scor: "+score;
      if (speed <= 45) speed ++;
      clearInterval(game_loop);
      game_loop=setInterval(draw, 1000/speed);
    }
    else{
      for (var j=1; j<snake.length; j++){
        var s=snake[j];
        if (headX==s.x && headY == s.y){
          gameover();
        }
      }
    }

  }



  function draw(){
    screenDraw();
    paintSnake();
    drawFood(foodColor);
    updateSnake();
  }


  function reset(){
    menu2.style.display="none";
    initSnake();
    createFood();
    dir = "right";
    speed = 15;
    score = 0;
    foodColor = "yellow";
    foodCount = 1;
    scoreText.innerHTML = "Scor: "+score;
    game_loop = setInterval(draw, 1000/speed);
  }

  function gameover(){
    clearInterval(game_loop);
    timeText.style.display="none";

    music.load();
    music.loop=true;
    music.play();

    menu2.style.display="inline";
    var best = getCookie();
    if (score>best) {
      setCookie(score);
      best=score;
    }
    bestText.innerHTML="Record: "+getCookie();
  }
  function setTime(){
    timeText.style.display="inline";
    var sec = 5;
    timeText.textContent = sec;
    interval = setInterval(function(){
      sec--;

      if (sec<=0) {
        clearInterval(interval);
        timeText.style.display="none";
        foodColor="yellow";
        createFood();
      }
      timeText.textContent = sec;
    }, 1000);
  }

  reset();
}


function getCookie(){
  var best = document.cookie.split('=')[1];
  if (best==null) return 0;
  return best;
}

function setCookie(best){
  document.cookie="best="+best;
}
