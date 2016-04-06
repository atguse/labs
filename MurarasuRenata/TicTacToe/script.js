n=0;


function myFunction(i) {
	var x = document.getElementById("square"+i);
	if(x.style.backgroundImage == "" || x.style.backgroundImage == "none") {
		if(n%2 == 0)
			x.style.backgroundImage = "url('x.png')";
		else
			x.style.backgroundImage = "url('0.png')";
		n++;
	}
}

function NewGame() {
	var x = document.getElementsByClassName("square");
	for (i=0;i<9;i++)
		x[i].style.backgroundImage="none";
}
