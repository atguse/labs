var game=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
var winPos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var turn = 0;
var scor2=0;
var scor1=0;
var first=1;

window.onload = function(){
    turnColor();
};

function turnColor(){
    el1=document.getElementById("scor1");
    el2=document.getElementById("scor2");

    if (first==1){
        if (turn%2==0){
            el1.style.color="#C63D0F";
            el1.style.fontWeight="bold";
            el2.style.color="black";
            el2.style.fontWeight="normal";
        }
        else{
            el2.style.color="#C63D0F";
            el2.style.fontWeight="bold";
            el1.style.color="black";
            el1.style.fontWeight="normal";
        }

    }else{
        if (turn%2==0){
            el2.style.color="#C63D0F";
            el2.style.fontWeight="bold";
            el1.style.color="black";
            el1.style.fontWeight="normal";
        }
        else{
            el1.style.color="#C63D0F";
            el1.style.fontWeight="bold";
            el2.style.color="black";
            el2.style.fontWeight="normal";
        }
    }
}


function canvasClicked(cvsNumber){
    var el=document.getElementById(cvsNumber);
    el.className="flip";
    var ctx=el.getContext("2d");
    if (game[cvsNumber-1]==-1){

        ctx.lineWidth = 4;
        ctx.strokeStyle = "white";
        ctx.lineCap = "round";

        ctx.beginPath();

        if (first==1){

            if (turn%2==0){
                ctx.moveTo(20,20);
                ctx.lineTo(80,80);
                ctx.moveTo(80,20);
                ctx.lineTo(20,80);

                game[cvsNumber-1]=1;
            }
            else{
                ctx.arc(50,50,30,0,Math.PI*2,true);

                game[cvsNumber-1]=2;
            }
        }
        else{

            if (turn%2==0){
                ctx.arc(50,50,30,0,Math.PI*2,true);

                game[cvsNumber-1]=2;
            }
            else{
                ctx.moveTo(20,20);
                ctx.lineTo(80,80);
                ctx.moveTo(80,20);
                ctx.lineTo(20,80);

                game[cvsNumber-1]=1;
            }
        }

        ctx.stroke();
        ctx.closePath();
        turn++;
        checkForWinners(game[cvsNumber-1]);
        turnColor();
    }
}

function checkForWinners(x){
    for (var i=0;i<winPos.length;i++){
        if (game[winPos[i][0]]==x && game[winPos[i][1]]==x && game[winPos[i][2]]==x){
            if (x==1) {
                scor1++;
                document.getElementById("scor1").innerHTML = "Jucător 1 (X) : "+scor1;
                first=1;
                alert("JUCĂTORUL 1 (X) A CAȘTIGAT! EL VA FI PRIMUL.");
            }else{
                scor2++;
                document.getElementById("scor2").innerHTML = "Jucător 2 (0) : "+scor2;
                first=2;
                alert("JUCĂTORUL 2 (0) A CAȘTIGAT! EL VA FI PRIMUL.");
            }
            playAgain();
            return;
        }
    }
    if (turn==9){
        if (first==1) {
            alert("REMIZĂ! VA ÎNCEPE JUCATORUL 2 (0)");
            first=2;
        }
        else {
            alert("REMIZĂ! VA ÎNCEPE JUCATORUL 1 (X)");
            first=1;
        }
        playAgain();

    }
}

function playAgain(){
    for (var i=1; i<=9;i++){
        var el=document.getElementById(i.toString());
        el.className="";
        var ctx = el.getContext("2d");
        ctx.clearRect(0,0,100,100);
    }
    game=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
    turn = 0;

}
