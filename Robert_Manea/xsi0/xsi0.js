var i=0;
function check(obj){
	if(obj.src.indexOf("blank.jpg")>-1){
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
	line(0,1,2);
	line(3,4,5);
	line(6,7,8);
	line(0,3,6);
	line(1,4,7);
	line(2,5,8);
	line(0,4,8);
	line(2,4,6);
}

function line(j,k,l){
	var s1="img"+j;
	var s2="img"+k;
	var s3="img"+l;
	var o1=document.getElementById(s1);
	var o2=document.getElementById(s2);
	var o3=document.getElementById(s3);
	if(o1.src==o2.src && o2.src==o3.src) if(o1.src.indexOf("blank.jpg")<0) alert("WIN!");
}

function ai(){
	
}