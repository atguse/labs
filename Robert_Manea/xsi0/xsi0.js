var i=0;
var objs=[];
var k=0;

function init(){
	var j;
	document.addEventListener("keydown",press);
	for(j=0;j<9;j++){
		objs.push(document.getElementById("img"+j));
		objs[j].addEventListener("click",function(){check(this);});
		objs[j].addEventListener("mouseover",function(){over(this)});
		objs[j].addEventListener("mouseout",function(){out(this)});
	}
	over(objs[k]);
}

function clear(){
	for(j=0;j<9;j++){
		objs[j].src="blank.jpg";
	}
}

function over(obj){
	if(obj.src.indexOf("blank.jpg")>-1) obj.src="red.jpg";
	else if(obj.src.indexOf("x.jpg")>-1) obj.src="redx.jpg";
	else if(obj.src.indexOf("0.jpg")>-1) obj.src="red0.jpg";
}

function out(obj){
	if(obj.src.indexOf("red.jpg")>-1) obj.src="blank.jpg";
	else if(obj.src.indexOf("redx.jpg")>-1) obj.src="x.jpg";
	else if(obj.src.indexOf("red0.jpg")>-1) obj.src="0.jpg";
}

function press(e){
	var keynum;
	if(window.event)             
		keynum = e.keyCode;
	else if(e.which)                   
		keynum = e.which;
	var ll=k;
	switch(keynum){
		case 37:
		    if(k>0)
				k=k-1; 
			else
				k=8;
			break;
	    case 38:
			if(k>2)
				k=k-3; 
			else
				k=k+6;
			break;
		case 39:
			if(k<8)
				k=k+1; 
			else
				k=0;
			break;
		case 40:
			if(k<6)
				k=k+3; 
			else
				k=k-6;
			break;
		case 13:
			check(objs[k]);
			break;
		default:
		    alert("please press directional keys or enter");
			break;
	}
	out(objs[ll]);
	over(objs[k]);
}

function check(obj){
	if(obj.src.indexOf("red.jpg")>-1){
		if(i%2==0) {
			obj.src="x.jpg";
			i++;
		} else {
			obj.src="0.jpg";
			i++;
		}
	}
	win();
}

function win(){
	var j;
	for(j=0;j<3;j++) {
		line(objs[j*3],objs[j*3+1],objs[j*3+2]);
		line(objs[j],objs[j+3],objs[j+6]);
	}
	line(objs[0],objs[4],objs[8]);
	line(objs[2],objs[4],objs[6]);
}

function line(o1,o2,o3){
	if(o1.src==o2.src && o2.src==o3.src) if(o1.src.indexOf("blank.jpg")<0) {alert("WIN!"); clear();}
}

function ai(){
	
}