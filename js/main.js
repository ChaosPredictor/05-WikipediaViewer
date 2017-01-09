var inputText;
var	inputButton; 

$(document).ready(function(){
	startup();

	document.getElementById("search").addEventListener("click", function(){
		addInput();
	});
});

function startup(){
	inputText = document.createElement("INPUT");
	inputText.setAttribute("type", "text");
	inputText.setAttribute("value", "");
	inputText.setAttribute("placeholder", "Search..");
	inputButton = document.createElement("BUTTON");
	inputButton.setAttribute("type", "cancel");
	inputButton.style.background = "none";
	inputButton.style.border = "none";
	inputButton.innerHTML = 'cancel';
}

function removeInput(){

}

function addInput(){
	$(".input-div").append(inputText);
	$(".input-div").append(inputButton);
}
