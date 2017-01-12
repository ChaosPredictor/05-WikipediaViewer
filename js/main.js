var inputDivIn = true;

$(document).ready(function(){
	startup();

	document.getElementById("search").addEventListener("click", function(){
		addInput();
	});

    document.getElementById("closeSearch").addEventListener("click", function(){
	    removeInput();
	});

	document.getElementById('input').onkeydown = function(event) {
		if (event.keyCode == 13) {
			getResoultsFromWikipedia(readInput(), printToConsole);
		}
	};
});

function startup(){
};

function removeInput(){
	$("#input-div").hide();
	if (!inputDivIn) {
		console.log("move in");
		moveInputDivIn();
		showMainDiv();
	};
};

function addInput(){
	$("#input-div").show();
};

function readInput(){
	return $('#input').val();
};

function printToConsole(data){
	addItemList(data[1][0],data[2][0],data[3][0]);
};

function getResoultsFromWikipedia(data, callback) {
	//var data = readInput();
	//console.log(data);
	$.ajax({
		type: 'POST',
		url: 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+data+'&limit=15&namespace=0&format=json',
		crossDomain: true,
		data: '{"some":"json"}',
		dataType: 'jsonp',
		success: function(responseData, textStatus, jqXHR) {
			//console.log(responseData[3]);
			callback(responseData);
		    //var value = responseData.someKey;
		},
		error: function (responseData, textStatus, errorThrown) {
		    alert('POST failed.');
	    }
	});
	moveInputDivOut();
	hideMainDiv();
};

function moveInputDivOut(){
	$("#input-div").prependTo("body");
	inputDivIn = false;
};


function moveInputDivIn(){
	$("#input-div").appendTo("#main-div");
	inputDivIn = true;
};

function hideMainDiv(){
	$("#main-div").hide();
};

function showMainDiv(){
	$("#main-div").show();
};

function addItemList(title,text,link){
	var $item = $( ".list-item" ).clone()
	$item.appendTo( ".list" );
	$item.find("h3").text(title);
	$item.find("p").text(text);
	$item.find("a").attr("href", link);
	$item.show();
}
