n=0;


function myFunction(i) {
	var x = document.getElementsByClassName("square");
	if(x[i].style.backgroundImage == "" || x[i].style.backgroundImage == "none") {
		if(n%2 == 0)
			x[i].style.backgroundImage = "url('x.png')";
		else
			x[i].style.backgroundImage = "url('0.png')";
		n++;
	}
	isFinish();
}

function NewGame() {
	var x = document.getElementsByClassName("square");
	for (i=0;i<9;i++)
		x[i].style.backgroundImage="none";
	n=0;
}

function isFinish() {
	var x = document.getElementsByClassName("square");
	var xo = ['0', 'x'];
	for(i=0;i<2;i++) {
		if(
				(x[0].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[1].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[2].style.backgroundImage == "url(\""+ xo[i] +".png\")")
			||	(x[3].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[4].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[5].style.backgroundImage == "url(\""+ xo[i] +".png\")")
			||	(x[6].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[7].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[8].style.backgroundImage == "url(\""+ xo[i] +".png\")")
			||	(x[0].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[3].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[6].style.backgroundImage == "url(\""+ xo[i] +".png\")")
			||	(x[1].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[4].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[7].style.backgroundImage == "url(\""+ xo[i] +".png\")")
			||	(x[2].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[5].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[8].style.backgroundImage == "url(\""+ xo[i] +".png\")")
			||	(x[0].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[4].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[8].style.backgroundImage == "url(\""+ xo[i] +".png\")")
			||	(x[2].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[4].style.backgroundImage == "url(\""+ xo[i] +".png\")" && x[6].style.backgroundImage == "url(\""+ xo[i] +".png\")")
		   ) 
			{
				if(i==1)
					window.alert("Game over. X wins!");
				else
					window.alert("Game over. 0 wins!");
				NewGame();
			}
	}
	if(n==9) {
		window.alert("Game over!");
		NewGame();
	}

}

