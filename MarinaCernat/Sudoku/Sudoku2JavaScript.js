var i=0;
var nr=36;

var id_uri=["img0", "img1","img2","img3","img4","img5","img6","img7","img8","img9","img10","img11","img12","img13","img14",
        "img15","img16","img17","img18","img19","img20","img21","img22","img23","img24","img25","img26","img27","img28",
		"img29","img30","img31","img32","img33","img34","img35" ];
	
var poz = [2,3,6,7,28,29,32,33];
var act = [[0,0,2,3,0,0], [5,4,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,5,1], [0,0,6,2,0,0]];
var frecv = [0,0,0,0,0,0,0];
var vector_undo = [];
var poz_undo = 0;
obiecte = [];

function init()
{ 
  document.addEventListener("keydown", apasareTasta, false);
  
  for (j=0; j< nr; j++)
    {   
       obiecte[j] = document.getElementById("img"+j);
       obiecte[j].className = "defaultClass";
		
	}
	
  obiecte[i].className = "selectedClass";
}


function apasareTasta(ob)
{

   var nume_tasta;


		    if(window.event) 
			{ // IE                    
		      nume_tasta = ob.keyCode;
		    } 
			
			else 
			
		    if(ob.which)
			{ // Netscape/Firefox/Opera
		
		      nume_tasta = ob.which;
		    }

		  var ok=1;
		  switch(nume_tasta) 
		  {
			    case 37:
			        if(i > 0 ) 
					{
						i = i - 1; 
					}
					else
					{
						i = nr -1;
					}
			    break;
			    
				case 39:
			        if(i < nr - 1) 
					{
						i = i + 1; 
					}
					else
					{
						i = 0 ;
					}
			    break;
				
				case 38:
				    if(i > 5)
					{  
				       i = i-6; 
				    }
				break;
					
				case 40:
				    if(i < 30)
					{  
				       i = i+6; 
				    }
				break;

				
				case 49: 
				     
				       for(p = 0; p < poz.length; p++)
					      if(i == poz[p])
						     ok=0; 
						
					   if(ok == 1)
					      { 
					        obiecte[i].src = "1.png";
							vector_undo[poz_undo] = i; poz_undo++;
							
							var p1 = Math.floor(i/6); var p2=i%6;
							
					        act[p1][p2] = 1;
							 
						  }
					   break;
						 
				case 50: 
						
				        for(p = 0; p < poz.length; p++)
					      if(i == poz[p])
							ok=0;
						if(ok == 1)
						{  
					       obiecte[i].src = "2.png";
						   vector_undo[poz_undo] = i; poz_undo++;
						   
						   var p1=Math.floor(i/6); var p2=i%6;
						   act[p1][p2] = 2;
						    
						}
						break;
						 
				case 51: 
				       
				        for(p = 0; p < poz.length; p++)
					      if(i == poz[p])
							ok=0;
						if(ok == 1)
						{  
					       obiecte[i].src = "3.png";
						   vector_undo[poz_undo] = i; poz_undo++;
						   
					       var p1=Math.floor(i/6); var p2=i%6;
					       act[p1][p2] = 3;
						}
						break;
						 
				case 52: 
						
				        for(p = 0; p < poz.length; p++)
					      if(i == poz[p])
							ok=0;
						if(ok == 1)
						{
						  obiecte[i].src = "4.png";
						  vector_undo[poz_undo] = i; poz_undo++;
						  
					      var p1=Math.floor(i/6); var p2=i%6;
					      act[p1][p2] = 4;
						  
						}
						break;
				
				case 53: 
						
				        for(p = 0; p < poz.length; p++)
					      if(i == poz[p])
						    ok=0;
						if(ok == 1)
						{	
					        obiecte[i].src = "5.png";
							vector_undo[poz_undo] = i; poz_undo++;
							
					        var p1=Math.floor(i/6); var p2=i%6;
							act[p1][p2] = 5;
					    }
						break;
				
				case 54: 
						
				        for(p = 0; p < poz.length; p++)
					      if(i == poz[p])
						    ok=0;
						if(ok == 1)
						{	
					         obiecte[i].src = "6.png";
							 vector_undo[poz_undo] = i; poz_undo++;
							 
					        var p1=Math.floor(i/6); var p2=i%6;
							act[p1][p2] = 6;
						}
						break;
				
			
			    default: alert("Folositi doar tastele <- si ->");
			             break;
			}

		  	clearElements();
		  	obiecte[i].className = "selectedClass";
}

		 function clearElements()
		 {
		   for(j = 0 ; j < nr ; j ++ ) 
		   {
		      obiecte[j].className = "defaultClass";
		   }
		 } 

		 
		 
		function ver()
	{
        var k=0,l=0;
						
			for(k=0;k<6;k++)
		    { //alert("Sunt pe linia " + k );
				var okay = 1;
				frecv = [0,0,0,0,0,0,0];
				
				for(l=0;l<6;l++)
					frecv[act[k][l]] = frecv[act[k][l]] + 1;
						  
				for(t=0;t<7;t++)
				    if(frecv[t] > 1)
					{ okay = 0; }
						  
			  if(okay == 0)
	    	  { alert(" Cifrele se repeta pe linia "+ k +" !");
				break; }
						
			} 
						  
			if(okay == 1)
			{ //alert("Totul este corect pe linii");

                for(k=0;k<6;k++)
			    {   //alert("Sunt pe coloana " + k );
					var okayCOL = 1;
				    frecv = [0,0,0,0,0,0,0];
					          
					for(l=0;l<6;l++)
						frecv[act[l][k]] = frecv[act[l][k]] + 1;
						  
					for(t=0;t<7;t++)
					    if(frecv[t] > 1)
					    { okayCOL = 0; }
						  
				    if(okayCOL == 0)
				    { alert(" Cifrele se repeta pe coloana "+ k +" !");
					  break; }
						
			    } 
               if(okayCOL == 1)
			   alert("Felicitari, ati rezolvat corect !");

		    } 
						
	}
	
	function undo()
	{   var x;		   
		obiecte[vector_undo[poz_undo-1]].src = "casuta.png";
		poz_undo--;
	}
		 
