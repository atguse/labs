var myGamePiece;
var myObstacles = [];
var myScore;
var myMusic;
var mySound;
var myTime;

function startGame() {
    myGamePiece = new component(35, 35, "http://www.charbase.com/images/glyph/128568", 10, 120, "image");
    myScore = new component("0px", "Consolas", "white", 350, 30, "text");
    mySound = new sound ("./go.mp3")
    myMusic = new sound("./zack.mp3");
    myMusic.play();
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e)
        {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function(e){
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else 
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
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
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            document.getElementById("ima").src = "http://www.hey.fr/tools/emoji/ios_emoji_weary_cat_face.png";
            document.getElementById("inima").src = "https://s-media-cache-ak0.pinimg.com/236x/19/e3/3f/19e33f77e5bcaf306e4874e16409c560.jpg ";
            myMusic.stop();
            window.setTimeout(popup, 2000);
            mySound.play();
            myGameArea.stop();
            //document.write(myScore.txt= "Socul tau este: "+myGameArea.frameNo);
            
            return;
        } 
    }
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
   // if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    //if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }

    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 10;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 55;
        maxGap = 70;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();

}
function popup()
{
    alert(" Ai pierdut :( ");
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    } 
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}


function clearmove() {
   // myGamePiece.image.src ="http://www.charbase.com/images/glyph/128568 "
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
