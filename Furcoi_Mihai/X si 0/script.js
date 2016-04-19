var game=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
var winPos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var turn = 0;

function canvasClicked(cvsNumber){
    var el=document.getElementById(cvsNumber);
    el.className="flip";
    var ctx=el.getContext("2d");
    if (game[cvsNumber-1]==-1){

        ctx.lineWidth = 4;
        ctx.strokeStyle = "white";
        ctx.lineCap = "round";

        ctx.beginPath();

        if (turn%2){
            ctx.moveTo(20,20);
            ctx.lineTo(80,80);
            ctx.moveTo(80,20);
            ctx.lineTo(20,80);

            game[cvsNumber-1]=1;
        }
        else{
            ctx.arc(50,50,30,0,Math.PI*2,true);

            game[cvsNumber-1]=0;
        }

        ctx.stroke();
        ctx.closePath();
        turn++;
        checkForWinners(game[cvsNumber-1]);
    }
}

function checkForWinners(x){
    for (var i=0;i<winPos.length;i++){
        if (game[winPos[i][0]]==x && game[winPos[i][1]]==x && game[winPos[i][2]]==x){
            if (x==0) {
                alert("0 A CÂȘTIGAT!");
            }else{
                alert("X A CÂȘTIGAT!");
            }
            playAgain();
            return;
        }
    }
    if (turn==9){
        alert("REMIZĂ!");
        playAgain();
    }
}

function playAgain(){
    var ng=confirm("Joacă din nou!");
    if (ng){
        location.reload(true);
    }
}
