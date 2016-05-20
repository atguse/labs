$(document).ready(function(){

var won=false;
//Matrix
	var matrix=[];

	matrix[0]=[0,0,0,0];
	matrix[1]=[0,0,0,0];
	matrix[2]=[0,0,0,0];
	matrix[3]=[0,0,0,0];


//Score
var score_number=0;
$(".score-container").val("0");

//Best Score Cookie

function setCookie(cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "bestScore="+cvalue+"; "+expires;
}

function getCookie() {
    var name = "bestScore=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

if (getCookie()=="") {
	setCookie(0,30);
} else {
	$(".best-container").text(getCookie());
}


function randomTile(is_moved) {
	var x,y;
	if ( is_moved==true) {
		do {
			x=Math.floor((Math.random() * 4));
			y=Math.floor((Math.random() * 4));
		} while (matrix[x][y]!=0);
		matrix[x][y]=2;
	}
}

function sumTile(position) {
	var is_moved=false;
	switch (position) {
		case "left": {
			    for (var i = 0; i < matrix.length; i++) {
				for (var j = 0; j < matrix.length-1; j++) {
				for (var k = j+1; k < matrix.length ; k++) {
	 				if (matrix[i][j]==matrix[i][k] && matrix[i][k]!=0)
		 			{
		 				matrix[i][j]+=matrix[i][k];
		 				matrix[i][k]=0;
		 				score(matrix[i][j]);
		 				is_moved=true;
		 			}
		 			else
		 			if (matrix[i][j]==0 && matrix[i][k]!=0)
		 			{
		 				matrix[i][j]=matrix[i][k];
		 				matrix[i][k]=0;
		 				is_moved=true;
		 			}
		 		}
		 	}
		 }
	    }break;
	    case "up": {
			    for (var i = 0; i < matrix.length; i++) {
				for (var j = 0; j < matrix.length-1; j++) {
				for (var k = j+1; k < matrix.length ; k++) {
	 				if (matrix[j][i]==matrix[k][i] && matrix[k][i]!=0)
		 			{
		 				matrix[j][i]+=matrix[k][i];
		 				matrix[k][i]=0;
		 				score(matrix[j][i]);
		 				is_moved=true;
		 			}
		 			else
		 			if (matrix[j][i]==0 && matrix[k][i]!=0)
		 			{
		 				matrix[j][i]=matrix[k][i];
		 				matrix[k][i]=0;
		 				is_moved=true;
		 			}
		 		}
		 	}
		 }
	    }break;
	    case "right": {
		    	for (var i = 0; i < matrix.length; i++) {
				for (var j = matrix.length; j >0; j--) {
				for (var k = j-1; k >= 0 ; k--) {
	 				if (matrix[i][j]==matrix[i][k] && matrix[i][k]!=0)
		 			{
		 				matrix[i][j]+=matrix[i][k];
		 				matrix[i][k]=0;
		 				score(matrix[i][j]);
		 				is_moved=true;
		 			}
		 			else
		 			if (matrix[i][j]==0 && matrix[i][k]!=0)
		 			{
		 				matrix[i][j]=matrix[i][k];
		 				matrix[i][k]=0;
		 				is_moved=true;
		 			}
		 		}
		 	}
		 }
	    }break;
	    case "down": {
			    for (var i = 0; i < matrix.length; i++) {
				for (var j = matrix.length-1; j >0; j--) {
				for (var k = j-1; k >= 0 ; k--) {
	 				if (matrix[j][i]==matrix[k][i] && matrix[k][i]!=0)
		 			{
		 				matrix[j][i]+=matrix[k][i];
		 				matrix[k][i]=0;
		 				score(matrix[j][i]);
		 				is_moved=true;
		 			}
		 			else
		 			if (matrix[j][i]==0 && matrix[k][i]!=0)
		 			{
		 				matrix[j][i]=matrix[k][i];
		 				matrix[k][i]=0;
		 				is_moved=true;
		 			}
		 		}
		 	}
		 }
	    }break;
	}
			return is_moved;
}
function showMatrix() {
	for (var i = 0; i < matrix.length; i++) {
		 for (var j = 0; j < matrix.length; j++) {
		 	if (matrix[i][j]!=0) {
  				$(("#"+i)+j).html('<div class="tile tile-'+matrix[i][j]+'"><div class="tile-inner">'+matrix[i][j]+'</div></div></div>');
  			} else {
  				$(("#"+i)+j).html('');
		 	}
		}
	}
}

randomTile(true);
randomTile(true);
showMatrix();


$(document).keydown(function (e) {
    var key = e.which;
   if (key == 37 || key == 72 || key == 65) { 			//left arrow
   		e.preventDefault();
   		randomTile(sumTile("left"));
		showMatrix();

    } else if (key == 38 || key == 75 || key == 87) { 	//up arrow
    	e.preventDefault();
		randomTile(sumTile("up"));
		showMatrix();

    } else  if (key == 39 || key == 76 || key == 68) { 	//right arrow
    	e.preventDefault();
    	randomTile(sumTile("right"));
		showMatrix();

    } else if (key == 40 || key == 74 || key == 83) { 	//down arrow
    	e.preventDefault();
		randomTile(sumTile("down"));
		showMatrix();

    }

    if (gameOver()) {
    	$(".game-message").addClass("game-over");
    	$(".p-message").text("Game over!");
    }
    if (gameWin() && won==false) {
    	won=true;
    	$(".game-message").addClass("game-won");
    	$(".p-message").text("You win!");
    }
});


function score(add) {

score_number+=parseInt($(".score-container").val(), 10)+add;
if (parseInt(getCookie(), 10)<score_number) {
	$(".best-container").text(score_number);
	setCookie(score_number,30);
	$(".best-container").append("<div class='score-addition'>+"+score_number+"</div>");
}

$(".score-container").text(score_number);
$(".score-container").append("<div class='score-addition'>+"+add+"</div>");

}

function gameWin() {
	for (var i = 0; i < matrix.length; i++) 
	for (var j = 0; j < matrix.length; j++) 
		if (matrix[i][j]==2048) 
			return true; 
		
	return false;
}

function testMatrix(position) {
		var matrix_copy=matrix;
		var is_moved=false;
	switch (position) {
		case "left": {
			    for (var i = 0; i < matrix_copy.length; i++) {
				for (var j = 0; j < matrix_copy.length-1; j++) {
				for (var k = j+1; k < matrix_copy.length ; k++) {
	 				if (matrix_copy[i][j]==matrix_copy[i][k] && matrix_copy[i][k]!=0)
		 			{
		 				matrix_copy[i][j]+=matrix_copy[i][k];
		 				matrix_copy[i][k]=0;
		 				score(matrix_copy[i][j]);
		 				is_moved=true;
		 			}
		 			else
		 			if (matrix_copy[i][j]==0 && matrix_copy[i][k]!=0)
		 			{
		 				matrix_copy[i][j]=matrix_copy[i][k];
		 				matrix_copy[i][k]=0;
		 				is_moved=true;
		 			}
		 		}
		 	}
		 }
	    }break;
	    case "up": {
			    for (var i = 0; i < matrix_copy.length; i++) {
				for (var j = 0; j < matrix_copy.length-1; j++) {
				for (var k = j+1; k < matrix_copy.length ; k++) {
	 				if (matrix_copy[j][i]==matrix_copy[k][i] && matrix_copy[k][i]!=0)
		 			{
		 				matrix_copy[j][i]+=matrix_copy[k][i];
		 				matrix_copy[k][i]=0;
		 				score(matrix_copy[j][i]);
		 				is_moved=true;
		 			}
		 			else
		 			if (matrix_copy[j][i]==0 && matrix_copy[k][i]!=0)
		 			{
		 				matrix_copy[j][i]=matrix_copy[k][i];
		 				matrix_copy[k][i]=0;
		 				is_moved=true;
		 			}
		 		}
		 	}
		 }
	    }break;
	    case "right": {
		    	for (var i = 0; i < matrix_copy.length; i++) {
				for (var j = matrix_copy.length; j >0; j--) {
				for (var k = j-1; k >= 0 ; k--) {
	 				if (matrix_copy[i][j]==matrix_copy[i][k] && matrix_copy[i][k]!=0)
		 			{
		 				matrix_copy[i][j]+=matrix_copy[i][k];
		 				matrix_copy[i][k]=0;
		 				score(matrix_copy[i][j]);
		 				is_moved=true;
		 			}
		 			else
		 			if (matrix_copy[i][j]==0 && matrix_copy[i][k]!=0)
		 			{
		 				matrix_copy[i][j]=matrix_copy[i][k];
		 				matrix_copy[i][k]=0;
		 				is_moved=true;
		 			}
		 		}
		 	}
		 }
	    }break;
	    case "down": {
			    for (var i = 0; i < matrix_copy.length; i++) {
				for (var j = matrix_copy.length-1; j >0; j--) {
				for (var k = j-1; k >= 0 ; k--) {
	 				if (matrix_copy[j][i]==matrix_copy[k][i] && matrix_copy[k][i]!=0)
		 			{
		 				matrix_copy[j][i]+=matrix_copy[k][i];
		 				matrix_copy[k][i]=0;
		 				score(matrix_copy[j][i]);
		 				is_moved=true;
		 			}
		 			else
		 			if (matrix_copy[j][i]==0 && matrix_copy[k][i]!=0)
		 			{
		 				matrix_copy[j][i]=matrix_copy[k][i];
		 				matrix_copy[k][i]=0;
		 				is_moved=true;
		 			}
		 		}
		 	}
		 }
	    }break;
	}
	return is_moved;
}

function gameOver() {
	for (var i = 0; i < matrix.length; i++) 
	for (var j = 0; j < matrix.length; j++) 
		if (matrix[i][j]==0) 
			return false;
	if (!testMatrix("left") && !testMatrix("right") && !testMatrix("down") && !testMatrix("up"))
		return true;
	return false;
}
});