
var size = 1;
var speed=4;
var speedX=speed;
var speedY=0;
var myGamePiece = [];
var myObstacles = [];
var myBeans = [];
var myFruits = [];
var myMonsters = [];
var game = 0;
var direction = []

pacman = new component(20, 20, "pacman.png", 22, 120, "image");
myObstacles[0]  = new component(20, 520, "blue", 0, -20, "obstacle");
myObstacles[1]  = new component(680, 20, "blue", -20, 0, "obstacle");
myObstacles[2]  = new component(680, 20, "blue", -20, 460, "obstacle");
myObstacles[3]  = new component(20, 520, "blue", 620, -20, "obstacle");

myObstacles[4]  = new component(20, 96, "blue", 60, 60, "obstacle");
myObstacles[5]  = new component(20, 96, "blue", 60, 196, "obstacle");
myObstacles[6]  = new component(20, 96, "blue", 60, 332, "obstacle");
myObstacles[24]  = new component(20, 96, "blue", 560, 60, "obstacle");
myObstacles[25]  = new component(20, 96, "blue", 560, 196, "obstacle");
myObstacles[26]  = new component(20, 96, "blue", 560, 332, "obstacle");

myObstacles[7]  = new component(20, 136, "blue", 120, 175, "obstacle");
myObstacles[17]  = new component(20, 136, "blue", 180, 175, "obstacle");
myObstacles[16]  = new component(20, 136, "blue", 500, 175, "obstacle");
myObstacles[18]  = new component(20, 136, "blue", 440, 175, "obstacle");

myObstacles[8]  = new component(170, 20, "blue", 120, 60, "obstacle");
myObstacles[9]  = new component(170, 20, "blue", 120, 120, "obstacle");
myObstacles[10]  = new component(170, 20, "blue", 120, 400, "obstacle");
myObstacles[11]  = new component(170, 20, "blue", 120, 340, "obstacle");
myObstacles[12]  = new component(170, 20, "blue", 350, 60, "obstacle");
myObstacles[13]  = new component(170, 20, "blue", 350, 120, "obstacle");
myObstacles[14]  = new component(170, 20, "blue", 350, 400, "obstacle");
myObstacles[15]  = new component(170, 20, "blue", 350, 340, "obstacle");

myObstacles[19]  = new component(280, 20, "blue", 180, 292, "obstacle");

myObstacles[20]  = new component(20, 52, "blue", 230, 218, "obstacle");
myObstacles[22]  = new component(20, 52, "blue", 390, 218, "obstacle");

myObstacles[21]  = new component(110, 20, "blue", 180, 175, "obstacle");
myObstacles[23]  = new component(110, 20, "blue", 350, 175, "obstacle");

myGamePiece.push(pacman);

function startGame() {
    game ++;
    alert("Pacman\n\nLevel  " + game);
    size =1;
    speedX=0;
    speedY=0;
    score = 0;
    var s = document.getElementById("score");
    s.innerHTML = score;
    for (i=0; i< 29; i++)
        myBeans[i] = new component(5, 5, "brown", 40+i*20, 40, "bean");
    for (i=29; i< 58; i++)
        myBeans[i] = new component(5, 5, "brown", 40+(i-29)*20, 440, "bean");
    for (i=58; i< 77; i++)
        myBeans[i] = new component(5, 5, "brown", 40, 60+(i-58)*20, "bean");
    for (i=77; i< 96; i++)
        myBeans[i] = new component(5, 5, "brown", 600, 60+(i-77)*20, "bean");
    for (i=96; i< 105; i++)
        myBeans[i] = new component(5, 5, "brown", 320, 60 + (i-96)*20, "bean");
    for (i=105; i< 110; i++)
        myBeans[i] = new component(5, 5, "brown", 320, 340 + (i-105)*20, "bean");
    for (i=110; i< 129; i++)
        myBeans[i] = new component(5, 5, "brown", 100, 60+(i-110)*20, "bean");
    for (i=129; i< 148; i++)
        myBeans[i] = new component(5, 5, "brown", 540, 60+(i-129)*20, "bean");
    myFruits[0] = new component(30, 30, "cherry.png", 305, 240, "image");
    myFruits[1] = new component(30, 30, "strawberry.png", 305,  30, "image");
    myFruits[2] = new component(30, 30, "orange.png", 305,  420, "image");
    myMonsters[2] = new component(30, 30, "monster1.png", 305, 240, "image");
    myMonsters[1] = new component(30, 30, "monster2.png", 305,  30, "image");
    myMonsters[0] = new component(30, 30, "monster3.png", 305,  420, "image");
    direction[0] = -1;
    direction[1] =1;
    direction[2] = -1;
    myGameArea.start();
}
function stopGame() {
    speedX = 0;
    speedY = 0;
    clearInterval(myGameArea.interval);
    speed = 0;
     myMonsters.splice(2, 1);
     myMonsters.splice(1, 1);
     myMonsters.splice(0, 1);
    return ;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0 ,0 , this.canvas.width, this.canvas.height)
    },
    stop : function(crash) {
        if (isInArray(1, crash) || isInArray(2, crash))
            speedX = 0;
        if (isInArray(3, crash) || isInArray(4, crash)) 
            speedY = 0;
        myGameArea.clear(crash);
    }
}

function updateGameArea() { 
    var aux = [];
    for (i = 0; i < myObstacles.length; i += 1) {
        if (crash = myGamePiece[0].crashWith(myObstacles[i])) {
            aux.push(crash);
            myGameArea.stop(aux);
        }
        else
            crash =0;
    }  
    for (i = 0; i < myBeans.length; i += 1) {
        myGamePiece[0].eat(myBeans[i],i);
    }
    for (i = 0; i < myFruits.length; i += 1) {
        myGamePiece[0].eatFruit(myFruits[i],i);
    }
    for (i = 0; i < myMonsters.length; i += 1) {
        myGamePiece[0].eatMe(myMonsters[i],i);
    }

        myGameArea.clear(crash);   
            if (myGameArea.key && myGameArea.key == 37 ) {
                if( aux.length>0) {
                    ok=0;
                    for(i=0; i<aux.length; i++)  
                        if(aux[i] == 1)
                            ok=1
                    if(ok == 0) {
                        speedX = -speed; 
                        speedY = 0;
                    }
                }
                else {
                    speedX = -speed; 
                    speedY = 0;
                }
            }
            if (myGameArea.key && myGameArea.key == 39) {
                if( aux.length>0) {
                    ok=0;
                    for(i=0; i<aux.length; i++)  
                        if(aux[i] == 2)
                            ok=1
                    if(ok == 0) {
                        speedX = speed; 
                        speedY = 0;
                    }
                }
                else {
                speedX = speed;
                speedY = 0;
                }
            }
            if (myGameArea.key && myGameArea.key == 38) {
                if( aux.length>0) {
                    ok=0;
                    for(i=0; i<aux.length; i++)  
                        if(aux[i] == 3)
                            ok=1
                    if(ok == 0) {
                        speedX = 0; 
                        speedY = -speed;
                    }
                }
                else {
                speedX = 0;
                speedY = -speed;
            }
            }
            if (myGameArea.key && myGameArea.key == 40)  {
                if( aux.length>0) {
                    ok=0;
                    for(i=0; i<aux.length; i++)  
                        if(aux[i] == 4)
                            ok=1
                    if(ok == 0) {
                        speedX = 0;
                        speedY = speed; 
                    }
                }
                else {
                speedX = 0;
                speedY = speed; 
                } 
            }
            myGamePiece[0].speedX = speedX;
            myGamePiece[0].speedY = speedY;
    
        for (i=0;i<size;i=i+1) {
            myGamePiece[i].newPos();    
            myGamePiece[i].update();
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].update();
        }
        for (i = 0; i < myBeans.length; i += 1) {
            myBeans[i].update();
        }
        for (i = 0; i < myFruits.length; i += 1) {
            myFruits[i].update();
        }

        for (i = 0; i < myMonsters.length; i += 1) {
            if (myMonsters[i].x <= 20) {
                direction[i] = 1;}
            else if(myMonsters[i].x >= 590 )
                direction[i] = -1;

            if( myMonsters[i].x > 20 && direction[i] == -1) {
                myMonsters[i].x += (-3) -i;
            }
            else if ( myMonsters[i].x < 590 && direction[i] == 1) {
                myMonsters[i].x += 3 + i;
            }
            myMonsters[i].update(); 
        }
}

function component(width, height, color, x, y, type) {
    this.type = type;

    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;   
    this.update = function() {
        ctx = myGameArea.context;
        ctx.beginPath();
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else if (type == "obstacle") {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else  {
            ctx.fillStyle = color;
            ctx.arc(this.x, this.y, this.width, 0, 2*Math.PI, true);
        }
        ctx.fill();

        
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;  
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = 0;
        if ((myleft<=otherright && myleft>=otherright-19 ) 
            && ((mytop<=otherbottom+19 && mytop>=othertop-19)&& (mybottom>=othertop-19 && mybottom<=otherbottom+19)))  {
            crash =1; //left crash
        }
        if ((myright>=otherleft && myright<=otherleft+19)
            && ((mytop<=otherbottom+19 && mytop>=othertop-19)&& (mybottom>=othertop-19 && mybottom<=otherbottom+19)))  {
            crash =2; //right crash
        }
         if ((mytop<=otherbottom && mytop>=otherbottom-19 )
            &&((myleft<=otherright+19 && myleft>=otherleft-19) && (myright>=otherleft-19 && myright<=otherright+19))) {
            crash =3; //top crash
        }
         if ((mybottom>=othertop && mybottom<=othertop+19)
            &&((myleft<=otherright-19 && myleft>=otherleft+19) && (myright>=otherleft-19 && myright<=otherright+19))) {
            crash =4; //bottom crash
        }

        return crash;
    }

    this.eat = function (bean, i) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        if (bean.x<=myright && bean.x>=myleft &&  bean.y>=mytop && bean.y <=mybottom) {
            myBeans.splice(i, 1);
            score ++;
            var s = document.getElementById("score");
            s.innerHTML = score;
        }

        if(myBeans.length == 0) {
            alert("You win! Score: " + score);
            startGame();
        }

    }

     this.eatFruit = function (fruit, i) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        if (myright<=fruit.x+40 && myleft>=fruit.x-10 &&  mytop>=fruit.y-10 && mybottom<=fruit.y+40) {
            myFruits.splice(i, 1);
            score +=20;
            var s = document.getElementById("score");
            s.innerHTML = score;
        }
    }

         this.eatMe = function (monster, i) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            if (myright<=monster.x+40 && myleft>=monster.x-10 &&  mytop>=monster.y-10 && mybottom<=monster.y+40) {
                alert("Game over! Score: " + score);
                stopGame();
                
        }
    }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
