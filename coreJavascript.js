$(function() {

$.getJSON("http://www.imdb.com/movies-in-theaters/", function(response) {
	$.each(response.result, function(i,planet){
		$('<div>').appendTo(document.body);
	});
});

});
