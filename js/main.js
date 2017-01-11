
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
};

function addInput(){
	$("#input-div").show();
};

function readInput(){
	return $('#input').val();
};

function printToConsole(data){
	console.log(data);
}

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
			callback(responseData[3]);
		    //var value = responseData.someKey;
		},
		error: function (responseData, textStatus, errorThrown) {
		    alert('POST failed.');
	    }
	});
}
