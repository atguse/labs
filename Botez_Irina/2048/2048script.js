var ids=["i1","i2","i3","i4","i5","i6","i7", "i8", "i9","i10","i11","i12","i13","i14", "i15", "i16"];
var objs=[];
var next_block; // 1=> casuta 2, 2=> casuta 4

function obj_array()
{
for(var i=0;i<16;i++) 
	{ objs[i]=document.getElementById(ids[i]);
	  objs[i].setAttribute("onkeydown", "return move(event,this)");	
	  objs[i].tabIndex=0;
	}
}

function is_empty(obj)
{
 if(obj.src.indexOf("empty.png",0) >=0 ) 
 	return true;
 else return false;
}

function spaces_between_u(i,j)  // pt a muta pana in capatul de sus
{
	var cp=i;
	while(is_empty(objs[i])) i+=4;
	while(is_empty(objs[j])) j-=4;

	if(j-i < 0 || (j-i==4 && i==cp) || (j-i==0 && j==cp)) return false;
	else return true;
}

function spaces_between_l(i,j)  // pt a muta pana in capatul stang
{
	var cp=i;
	while(is_empty(objs[i])) i++;
	while(is_empty(objs[j])) j--;

	if(j-i < 0 || (j-i==1 && i==cp) || (j-i==0 && j==cp)) return false;
	else return true;
}


function start()
{
	obj_array();
	var k=0;
	while(k<2)
	{
		var poz=Math.floor(Math.random() * (15 - 0 + 1)) + 0; //cautam pozitie random pt prima casuta
		if(is_empty(objs[poz]))
		{
			k++;
			next_block=Math.floor(Math.random() * (2 - 1 + 1)) + 1;
			if(next_block==1) objs[poz].src=2+".png";
			else objs[poz].src=4+".png";
		}
	}

}

function move(e,el){
	var key; // left-37, up-38, right-39, down-40
		var e;

		if(window.event) { // IE                    
		      key = e.keyCode;
		    } else if(e.which){ // Netscape/Firefox/Opera                   
		      key = e.which;
		    }

		switch(key) {
			    case 37:
			    	moveLeft();
			        break;
      			case 38:
			    	moveUp();
			        break;
			    case 39:
			    	moveRight();
			        break;
			    case 40:
			    	moveDown();
			        break;    
			}    
}

function moveLeft()
{
	
	//while(spaces_between_l(0,3)) 
		for( i=1;i<4;i++)
			if(is_empty(objs[i-1]) && !is_empty(objs[i]))
			{
				objs[i-1].src=objs[i].src;
				if(i<3) objs[i].src=objs[i+1].src;
				else objs[i].src="empty.png";
				if(i+1==3) objs[i+1].src="empty.png";
				else if(is_empty(objs[i+2])) objs[i+1].src="empty.png";
				i-=1
			}
		
    
    //while(spaces_between_l(4,7)) 
		for(var i=5;i<8;i++)
			if(is_empty(objs[i-1]) && !is_empty(objs[i]))
			{
				objs[i-1].src=objs[i].src;
				if(i<7) objs[i].src=objs[i+1].src;
				else objs[i].src="empty.png";
				if(i+1==7) objs[i+1].src="empty.png";
				else if(is_empty(objs[i+2])) objs[i+1].src="empty.png";
				i-=1;
			}
		
		
	//while(spaces_between_l(8,11)) 	
		for(var i=9;i<12;i++)
			if(is_empty(objs[i-1]) && !is_empty(objs[i]))
			{
				objs[i-1].src=objs[i].src;
				if(i<11) objs[i].src=objs[i+1].src;
				else objs[i].src="empty.png";
				if(i+1==11) objs[i+1].src="empty.png";
				else if(is_empty(objs[i+2])) objs[i+1].src="empty.png";
				i-=1;
			}
	

	//while(spaces_between_l(12,15)) 
		for(var i=13;i<16;i++)
			if(is_empty(objs[i-1]) && !is_empty(objs[i]))
			{
				objs[i-1].src=objs[i].src;
				if(i<15) objs[i].src=objs[i+1].src;
				else objs[i].src="empty.png";
				if(i+1==15) objs[i+1].src="empty.png";
				else if(is_empty(objs[i+2])) objs[i+1].src="empty.png";
				i-=1;
			}			
	

}

function moveUp()
{    
	//while(spaces_between_u(0,12))
	for(var i=4;i<13;i+=4)
		if(is_empty(objs[i-4]) && !is_empty(objs[i]))
		{
			objs[i-4].src=objs[i].src;
			if(i<12) objs[i].src=objs[i+4].src;
			else objs[i].src="empty.png";
			if(i+4==12) objs[i+4].src="empty.png";
			else if(is_empty(objs[i+8])) objs[i+4].src="empty.png";
			i-=4;
		}

	//while(spaces_between_u(1,13))	
	for(var i=5;i<14;i+=4)
		if(is_empty(objs[i-4]) && !is_empty(objs[i]))
		{
			objs[i-4].src=objs[i].src;
			if(i<13) objs[i].src=objs[i+4].src;
			else objs[i].src="empty.png";
			if(i+4==13) objs[i+4].src="empty.png";
			else if(is_empty(objs[i+8])) objs[i+4].src="empty.png";
			i-=4;
		}	

	//while(spaces_between_u(2,14))
	for(var i=6;i<15;i+=4)
		if(is_empty(objs[i-4]) && !is_empty(objs[i]))
		{
			objs[i-4].src=objs[i].src;
			if(i<14) objs[i].src=objs[i+4].src;
			else objs[i].src="empty.png";
			if(i+4==14) objs[i+4].src="empty.png";
			else if(is_empty(objs[i+8])) objs[i+4].src="empty.png";
			i-=4;
		}

	//while(spaces_between_u(3,15))
	for(var i=7;i<16;i+=4)
		if(is_empty(objs[i-4]) && !is_empty(objs[i]))
		{
			objs[i-4].src=objs[i].src;
			if(i<15) objs[i].src=objs[i+4].src;
			else objs[i].src="empty.png";
			if(i+4==15) objs[i+4].src="empty.png";
			else if(is_empty(objs[i+8])) objs[i+4].src="empty.png";
			i-=4;
		}		
}

function moveRight()
{
	for(var i=2;i>=0;i--)
		if(is_empty(objs[i+1]) && !is_empty(objs[i]))
		{
			objs[i+1].src=objs[i].src;
			if(i>0) objs[i].src=objs[i-1].src;
			else objs[i].src="empty.png";
			if(i-1==0) objs[i-1].src="empty.png";
			else if(is_empty(objs[i-2])) objs[i-1].src="empty.png";
			i+=1;
		}

		for(var i=6;i>=4;i--)
		if(is_empty(objs[i+1]) && !is_empty(objs[i]))
		{
			objs[i+1].src=objs[i].src;
			if(i>4) objs[i].src=objs[i-1].src;
			else objs[i].src="empty.png";
			if(i-1==4) objs[i-1].src="empty.png";
			else if(is_empty(objs[i-2])) objs[i-1].src="empty.png";
			i+=1;
		}

		for(var i=10;i>=8;i--)
		if(is_empty(objs[i+1]) && !is_empty(objs[i]))
		{
			objs[i+1].src=objs[i].src;
			if(i>8) objs[i].src=objs[i-1].src;
			else objs[i].src="empty.png";
			if(i-1==8) objs[i-1].src="empty.png";
			else if(is_empty(objs[i-2])) objs[i-1].src="empty.png";
			i+=1;
		}

		for(var i=14;i>=12;i--)
		if(is_empty(objs[i+1]) && !is_empty(objs[i]))
		{
			objs[i+1].src=objs[i].src;
			if(i>12) objs[i].src=objs[i-1].src;
			else objs[i].src="empty.png";
			if(i-1==12) objs[i-1].src="empty.png";
			else if(is_empty(objs[i-2])) objs[i-1].src="empty.png";
			i+=1;
		}

}

function moveDown()
{
	for(var i=8;i>=0;i-=4)
		if(is_empty(objs[i+4]) && !is_empty(objs[i]))
		{
			objs[i+4].src=objs[i].src;
			if(i>0) objs[i].src=objs[i-4].src;
			else objs[i].src="empty.png";
			if(i-4==0) objs[i-4].src="empty.png";
			else if(is_empty(objs[i-8])) objs[i-4].src="empty.png";
			i+=4;
		}

	for(var i=9;i>=1;i-=4)
		if(is_empty(objs[i+4]) && !is_empty(objs[i]))
		{
			objs[i+4].src=objs[i].src;
			if(i>1) objs[i].src=objs[i-4].src;
			else objs[i].src="empty.png";
			if(i-4==1) objs[i-4].src="empty.png";
			else if(is_empty(objs[i-8])) objs[i-4].src="empty.png";
			i+=4;
		}
		
		for(var i=10;i>=2;i-=4)
		if(is_empty(objs[i+4]) && !is_empty(objs[i]))
		{
			objs[i+4].src=objs[i].src;
			if(i>2) objs[i].src=objs[i-4].src;
			else objs[i].src="empty.png";
			if(i-4==2) objs[i-4].src="empty.png";
			else if(is_empty(objs[i-8])) objs[i-4].src="empty.png";
			i+=4;
		}
       
       for(var i=11;i>=3;i-=4)
		if(is_empty(objs[i+4]) && !is_empty(objs[i]))
		{
			objs[i+4].src=objs[i].src;
			if(i>3) objs[i].src=objs[i-4].src;
			else objs[i].src="empty.png";
			if(i-4==3) objs[i-4].src="empty.png";
			else if(is_empty(objs[i-8])) objs[i-4].src="empty.png";
			i+=4;
		}
			



}


