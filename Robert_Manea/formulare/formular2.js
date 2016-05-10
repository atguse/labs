var obj='{}';
function f(){
	var myForm=document.forms["myF"];
	var t=myForm.elements["titlu"].value;
	var b=myForm.elements["body2"].value;
	var cat=myForm.elements["categ"].value;
	alert(t);
	var i=myForm.elements["imp"].value;
	var c=cat.options[cat.SelectedIndex].value;
	
	alert(c);
	var pp=1;
	if(t.length<10 || t.length>50) pp=0;
	if(b.length<100) pp=0;
	if(isNaN(i) || i=='') pp=0;
	if(pp==0) {alert("nope"); return false;}
	else {alert("yay");
		  if(!obj[c]) obj[c]={};
		  if(!obj[c][i]) obj[c][i]={};
		  if (typeof(Storage) !== "undefined") {
					localStorage.setItem("titlu",t);
					localStorage.setItem("body2",b);
					localStorage.setItem("categ",c);
					localStorage.setItem("imp",i);
					document.getElementById("result").innerHTML = localStorage.getItem("titlu") + localStorage.getItem("body2") + localStorage.getItem("categ") + localStorage.getItem("imp");return true;}	
		  else {alert("Sorry, your browser does not support Web Storage..."); return true;}
		  alert(obj);}
}