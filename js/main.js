
$(document).ready(function(){
	startup();

	document.getElementById("search").addEventListener("click", function(){
		addInput();
	});

    document.getElementById("closeSearch").addEventListener("click", function(){
	    removeInput();
	});

});

function startup(){
}

function removeInput(){
	$("#input-div").hide();
}

function addInput(){
	$("#input-div").show();
}
