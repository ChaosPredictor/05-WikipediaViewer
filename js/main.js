var inputDivIn = true;

$(document).ready(function(){
	startup();

	document.getElementById("searchButton").addEventListener("click", function(){
		addInput();
	});

    document.getElementById("closeSearch").addEventListener("click", function(){
	    removeInput();
	});

    document.getElementById("newSearchButton").addEventListener("click", function(){
	    removeInput();
	});

	document.getElementById('input').onkeydown = function(event) {
		if (event.keyCode == 13) {
			deleteListItems();
			getResoultsFromWikipedia(readInput(), printResults);
		}
	};
});

function startup(){
};

function removeInput(){
	$("#input-div").hide();
	if (!inputDivIn) {
		//console.log("move in");
		moveInputDivIn();
		showMainDiv();
		deleteListItems();
	};
};

function addInput(){
	$("#input-div").show();
};

function readInput(){
	return $('#input').val();
};

function printResults(data){
	var $origItem = $( ".list-item" ).first();
	$("#titleResult").text(data[0]);
	for (var i = 0; i < data[1].length ; i++) {
		$item = $origItem.clone();
		$item.appendTo( ".list" );
		$item.find("h3").text(data[1][i]);
		$item.find("p").text(data[2][i]);
		$item.find("a").attr("href", data[3][i]);
		$item.show();
	};
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
	//$("#input-div").prependTo("body");
	inputDivIn = false;
};


function moveInputDivIn(){
	//$("#input-div").appendTo("#main-div");
	inputDivIn = true;
};

function hideMainDiv(){
	$("#main-div").hide();
	$("#searchResultTitle").show();
};

function showMainDiv(){
	$("#main-div").show();
	$("#searchResultTitle").hide();
};

function addItemList(title,text,link){
};

function deleteListItems(){
	var $items = $(".list-item");
	for (var i = 1; i < $items.length; i++) {
		$items[i].remove();
	}
};
