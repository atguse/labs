function f(){
	var myForm=document.forms["f1"];
	var mySelectValue=myForm.elements["inputs"].value;
	var node=document.getElementById("container");
	var child2=document.createElement("LABEL");
	var i=document.getElementById("intr");
	child2.innerHTML=i.value;
	child2.type="label";
	node.appendChild(child2);
	var str=i.value;
	var i=str.match(/\d+/g);
	var nr=Number(i);
	var j;
	for(j=1;j<=nr;j++){
	var child=document.createElement(mySelectValue);
	var o=document.getElementById("opt");
	var myType=o.options[o.selectedIndex].text;
	child.type=myType;
	node.appendChild(child);
	}
	return false;
}