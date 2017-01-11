
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
			openW();
			//alert('5');
		}
	};
});

function startup(){
}

function removeInput(){
	$("#input-div").hide();
}

function addInput(){
	$("#input-div").show();
}

function openW() {
	alert("data");
	
	$.ajax({
		type: 'POST',
		url: 'http://en.wikipedia.org/w/api.php?action=opensearch&search=Albert%20Einstein&limit=10&namespace=0&format=json',
		crossDomain: true,
		data: '{"some":"json"}',
		dataType: 'jsonp',
		success: function(responseData, textStatus, jqXHR) {
			console.log(responseData[0]);
		    var value = responseData.someKey;
		},
		error: function (responseData, textStatus, errorThrown) {
		    alert('POST failed.');
	    }
	});

	//$.get("http://en.wikipedia.org/w/api.php?action=opensearch&search=Albert%20Einstein&limit=10&namespace=0&format=json", function(data){
	//	console.log(data);     
	//});

	//var term = 'Albert Einstein'i;
	//$.get('https://en.wikipedia.org/w/api.php?action=opensearch&search=Albert%20Einstein&limit=10&namespace=0&format=json', function(data){
	//	console.log(data);
	//	alert("work");     
	//});
	//$.ajax({
	//	type:     "post",
	//	data:     {id: 0},
	//	cache:    false,
	//	url:      ,"http://wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&redirects&titles=San_Francisco,_CA"
	//	dataType: "data",
	//	error: function(xhr, status, error) {
	//		var err = eval("(" + xhr.responseText + ")");
	//		console.log(xhr);
	//		alert("Error: " + xhr);
	//	},
	//	success: function () {
	//		alert(" Done ! ");
	//	}
	//});
	
	//vat temp = "Albert Einstein";
	//'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+term+'&utf8='
}
