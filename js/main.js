var inputDivIn = true;
var wordsArray = [];

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

	$( "#autocomplete" ).focus(function() {
		showAllFromContainer();
	});
	$("#autocomplete").autocomplete({source:function(request, response) {
        var results = $.ui.autocomplete.filter(wordsArray, request.term);
        response(results.slice(0, 8));
    }, appendTo: "#container", autoFocus: true});
	$('.autocomplete').focus(); 
    
	$('#autocomplete').on('autocompleteselect', function (e, ui) {
		deleteListItems();
		if (ui.item.value) {
			getResoultsFromWikipedia(ui.item.value, printResults);
		} else {
			getResoultsFromWikipedia($( "#autocomplete" ).val(), printResults);
		}
    });

	$('#autocomplete').keyup(function(e){
		if(e.keyCode == 13)
		{
			getResoultsFromWikipedia($( "#autocomplete" ).val(), printResults);
		}
	});
	
});

function startup(){
	readTextFile("words.txt");
};

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                wordsArray = allText.split("\n");
				//alert(allText);
            }
        }
    }
    rawFile.send(null);
}
function removeInput(){
	$("#input-div").hide();
	if (!inputDivIn) {
		moveInputDivIn();
		showMainDiv();
		deleteListItems();
		hideAllFromContainer();
	};
};

function hideAllFromContainer() {
	$("#container").hide();	
};

function showAllFromContainer() {
	$("#container").show();	
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
	$.ajax({
		type: 'POST',
		url: 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+data+'&limit=15&namespace=0&format=json',
		crossDomain: true,
		data: '{"some":"json"}',
		dataType: 'jsonp',
		success: function(responseData, textStatus, jqXHR) {
			callback(responseData);
		},
		error: function (responseData, textStatus, errorThrown) {
		    alert('POST failed.');
	    }
	});
	moveInputDivOut();
	hideMainDiv();
};

function moveInputDivOut(){
	inputDivIn = false;
};


function moveInputDivIn(){
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
