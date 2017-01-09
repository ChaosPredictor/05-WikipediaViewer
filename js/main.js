var x; 

$(document).ready(function(){
	startup();

	document.getElementById("search").addEventListener("click", function(){
		addInput();
	});
});

function startup(){
	x = document.createElement("INPUT");
	x.setAttribute("type", "text");
	x.setAttribute("value", "");
}

function removeInput(){

}

function addInput(){
	$(".input-div").append(x);
}
