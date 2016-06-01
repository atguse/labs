
var objs=[];
var ids=["img1","img2","img3","img4","img5","img6","img7","img8","img9","img10",
		 "img11","img12","img13","img14","img15","img16","img17","img18","img19","img20",
		 "img21","img22","img23","img24","img25","img26","img27","img28","img29","img30",
		 "img31","img32","img33","img34","img35","img36","img37","img38","img39","img40",
		 "img41","img42","img43","img44","img45","img46","img47","img48","img49","img50",
		 "img51","img52","img53","img54","img55","img56","img57","img58","img59","img60",
		 "img61","img62","img63","img64","img65","img66","img67","img68","img69","img70",
		 "img71","img72","img73","img74","img75","img76","img77","img78","img79","img80",
		 "img81","img82","img83","img84","img85","img86","img87","img88","img89","img90",
		 "img91","img92","img93","img94","img95","img96","img97","img98","img99","img100"];
var sarpe;//Vectorul ce contine pozitiile care le ocupa sarpele [NOTA: 0=cap;marime-1=coada]
var GO;//pentru a porni sarpele de la prima tasta apasata
var continuare;//este folosit pentru a directiona sarpele adresa cu adresa
var marime;//marimea sarpelui
var repetir;
var poz=0;//pozitia efectiva a capului
var intervalID//variabila care ma ajuta sa deplasez sarpele cu o anumita viteza
var score=0;
var highscore=0;
document.addEventListener("keydown", onKeyPressEvent, false);

function init()
{
	
	var i;
	for(i=0;i<=100;i++)
	{
		objs.push(document.getElementById("img"+i));
	}
	
	joc_nou();
}
function mar()
{
	var x = Math.floor((Math.random() * 100) + 1);
	if(objs[x].src.indexOf("1pe1.png",0)!=-1 & x!=poz)
		objs[x].src="mar.png";
	
}
function joc_nou()
{
	clearInterval(intervalID);
	var i;
	GO=0;//variabila care proneste mersul sarpelui
	repetir=65;//l-am facut 65 ca sa scap de BUG-ul de la pornirea cu spatele
	for(i=1;i<=100;i++)
		objs[i].src="1pe1.png";
	//initializarea sarpelui cu pozitiile care le ocupa + marimea>>>>>>>>
	sarpe=[];
	poz=67;
	objs[67].src="Cap_W.png";
	sarpe.push(67);
	objs[68].src="EW.png";
	sarpe.push(68);
	objs[69].src="EW.png";
	sarpe.push(69);
	objs[70].src="Coada_E.png";
	sarpe.push(70);
	marime=4;
	//<<<<<<<<<<<<<<
	mar();
	document.getElementById("score").innerHTML=score;
	document.getElementById("highscore").innerHTML=highscore;
}

function onKeyPressEvent(e)
{
		    var keynum,ok=0,muscat=0;//ok e folosit pentru a ma asigura ca sarpele nu merge cu spatele;
		    if(window.event) { // IE                    
		      keynum = e.keyCode;
		    } else if(e.which){ // Netscape/Firefox/Opera                   
		      keynum = e.which;
		    }	
			if(keynum == 87 | keynum == 68 | keynum == 65 | keynum == 83 )//conditie pentru a folosi WASD
				if(!(keynum==68 & objs[poz].src.indexOf("Cap_W.png",0)!=-1)&
				   !(keynum==65 & objs[poz].src.indexOf("Cap_E.png",0)!=-1)&
				   !(keynum==87 & objs[poz].src.indexOf("Cap_S.png",0)!=-1)&
				   !(keynum==83 & objs[poz].src.indexOf("Cap_N.png",0)!=-1)
				  )//condoitie pentru a nu da cu spatele
					repetir=keynum;
			if(GO==0)
			{
				clearInterval(intervalID);
				intervalID=setInterval(function(){porneste(repetir);},100);
				GO=1;
			}
			
		   // alert(String.fromCharCode(keynum));
		    //alert(keynum);
			// W = 87;
		    // A = 65;
		    // D = 68;
			// S = 83;
			// SPACEBAR = 32;
			
			//porneste(keynum);
			
			/*if(objs[poz].src.indexOf("Patrat.png",0)!=-1)
		  	{
				objs[poz].src = "Patrat_rosu.png";
			}
			if(objs[poz].src.indexOf("X.png",0)!=-1)
		  	{
				objs[poz].src = "X_rosu.png";
			}
			if(objs[poz].src.indexOf("0.png",0)!=-1)
		  	{
				objs[poz].src = "0_rosu.png";
			}
			*/

}
function porneste(keynum)
{
	var ok=1
	
	switch(keynum) {
	    case 65:
	        if(poz % 10 == 1) 
			{
				 ok=0;
			}
			else
			{
				if(
				   objs[poz-1].src.indexOf("1pe1.png",0)!=-1 | 
				   objs[poz-1].src.indexOf("Coada",0)!=-1    |
				   objs[poz-1].src.indexOf("mar.png",0)!=-1	 
				  )
				{
					poz = poz - 1;
				}
				else
					ok=0;
			}
	        break;
	    case 68:
	        if(poz % 10 == 0)
			{
				 ok=0;
			}
			else
			{
				if(
				   objs[poz+1].src.indexOf("1pe1.png",0)!=-1 |
				   objs[poz+1].src.indexOf("Coada",0)!=-1    |
				   objs[poz+1].src.indexOf("mar.png",0)!=-1
				  )
				{
					poz = poz + 1;
				}
				else
					ok=0;
			}
	        break;
		case 87:
			if(poz <= 10)
			{
				 ok=0;
			}
			else
			{
				if(
				   objs[poz-10].src.indexOf("1pe1.png",0)!=-1 | 
				   objs[poz-10].src.indexOf("Coada",0)!=-1    |
				   objs[poz-10].src.indexOf("mar.png",0)!=-1
				  )
				{
					poz = poz - 10;
				}
				else
					ok=0;
			}
			break;
		case 83:
			if(poz >=91)
			{
				 ok=0;
			}
			else
			{
				if(
				   objs[poz+10].src.indexOf("1pe1.png",0)!=-1 | 
			       objs[poz+10].src.indexOf("Coada",0)!=-1    |
				   objs[poz+10].src.indexOf("mar.png",0)!=-1
				  )
				{
					poz = poz + 10;
				}
				else
					ok=0
			}
			break;
	}

			
		if(ok==1)
			muta(keynum);
		else
		{
			alert("te-ai lovit");
			if(highscore <= score)
			{
				highscore=score;
			}
			document.getElementById("highscore").innerHTML=highscore;
			score=0;
			joc_nou();
		}
}
function muta(directie)
{
	var fostul_cap,i,ok;
	if(directie == 65)
	{	
		fostul_cap=sarpe[0];
		objs[poz].src="Cap_W.png";
		sarpe[0]=poz;
		if(poz-sarpe[1]==-2)
		{	
			objs[fostul_cap].src="EW.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
		if(poz-sarpe[1]==-11)
		{
			objs[fostul_cap].src="WS.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
		if(poz-sarpe[1]==9)
		{
			objs[fostul_cap].src="WN.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
	}
	if(directie == 87)
	{
		fostul_cap=sarpe[0];
		objs[poz].src="Cap_N.png";
		sarpe[0]=poz;
		if(poz-sarpe[1]==-11)
		{	
			objs[fostul_cap].src="EN.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
		if(poz-sarpe[1]==-20)
		{	
			objs[fostul_cap].src="NS.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
		if(poz-sarpe[1]==-9)
		{	
			objs[fostul_cap].src="WN.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
	}
	if(directie == 68)
	{
		fostul_cap=sarpe[0];
		objs[poz].src="Cap_E.png";
		sarpe[0]=poz;
		if(poz-sarpe[1]==2)
		{	
			objs[fostul_cap].src="EW.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
		if(poz-sarpe[1]==-9)
		{	
			objs[fostul_cap].src="ES.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
		if(poz-sarpe[1]==11)
		{	
			objs[fostul_cap].src="EN.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
	}
	if(directie == 83)
	{
		fostul_cap=sarpe[0];
		objs[poz].src="Cap_S.png";
		sarpe[0]=poz;
		if(poz-sarpe[1]==9)
		{	
			objs[fostul_cap].src="ES.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
		if(poz-sarpe[1]==20)
		{	
			objs[fostul_cap].src="NS.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
		if(poz-sarpe[1]==11)
		{	
			objs[fostul_cap].src="WS.png";
			continuare=sarpe[1];
			sarpe[1]=fostul_cap;
		}
	}
	for(i=1;i<=100;i++)
	{
		if(objs[i].src.indexOf("mar.png",0)!=-1)
		{
			ok=1;
			break;
		}
		ok=0;
	}
	if(ok==0)
	{
		creste();
		score=score+10;
		document.getElementById("score").innerHTML=score;
	}
	else
	{
	
	}
	aranjare();
}
function aranjare()
{
	var i,aux;
	//MISCAREA Cap-1 pana la Coada+1 >>>>>
	for(i=2;i<=marime-1;i++)
	{
		
		aux=sarpe[i];
		sarpe[i]=continuare;
		continuare=aux;
	}
	//<<<<<<<<< MISCAREA Cap-1 pana la Coada+1
	//Forma cozii >>>>>>>>>
	if(
		(objs[sarpe[marime-2]].src.indexOf("EW.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==1)|
		(objs[sarpe[marime-2]].src.indexOf("ES.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==-10)|
		(objs[sarpe[marime-2]].src.indexOf("EN.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==10)
	  )	
	{
		objs[sarpe[marime-1]].src="Coada_E.png";
	}
	if(
		(objs[sarpe[marime-2]].src.indexOf("EW.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==-1)|
		(objs[sarpe[marime-2]].src.indexOf("WS.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==-10)|
		(objs[sarpe[marime-2]].src.indexOf("WN.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==10)
	  )	
	{
		objs[sarpe[marime-1]].src="Coada_W.png";
	}
	if(
		(objs[sarpe[marime-2]].src.indexOf("NS.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==10)|
		(objs[sarpe[marime-2]].src.indexOf("ES.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==-1)|
		(objs[sarpe[marime-2]].src.indexOf("WS.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==1)
	  )	
	{
		objs[sarpe[marime-1]].src="Coada_S.png";
	}
	if(
		(objs[sarpe[marime-2]].src.indexOf("NS.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==-10)|
		(objs[sarpe[marime-2]].src.indexOf("WN.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==1)|
		(objs[sarpe[marime-2]].src.indexOf("EN.png",0)!=-1 & sarpe[marime-2]-sarpe[marime-3]==-1)
	  )	
	{
		objs[sarpe[marime-1]].src="Coada_N.png";
	}
	//Forma cozii <<<<<<<<<<<<<<<<
	if(objs[continuare].src.indexOf("Cap",0)==-1)
		objs[continuare].src="1pe1.png"; //pentru a elimina coada din spate
	
}
function creste()
{
	marime=marime+1;
	mar();
}