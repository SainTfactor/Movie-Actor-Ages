$(function() {

    var arrayOfMovies = new Array(); // array of currently playing movies
    var arrayOfActors = new Array(); // array of currently playing movies
    
    var retval = $.ajax({
        url: "http://www.google.com/movies",
        type: "GET",
        data: { "near" : "36375" },
    })
    .done(function(data) {
        
        var html = $.parseHTML(data.results[0]); 
        
        for(var i = 0; i < $(html).find("div.theater").length; i++)
        {
            var theater = $(html).find("div.theater")[i];
            for(var j = 0; j < $(theater).find(".showtimes .show_left .movie").length; j++)
            {
                var movie = $(theater).find(".showtimes .show_left .movie")[j];
                if($.inArray($(movie).find(".name a")[0].innerHTML, arrayOfMovies))
                    arrayOfMovies[arrayOfMovies.length] = $(movie).find(".name a")[0].innerHTML;
            }
            for(var j = 0; j < $(theater).find(".showtimes .show_right .movie").length; j++)
            {
                var movie = $(theater).find(".showtimes .show_right .movie")[j];
                if($.inArray($(movie).find(".name a")[0].innerHTML, arrayOfMovies))
                    arrayOfMovies[arrayOfMovies.length] = $(movie).find(".name a")[0].innerHTML;
            }
        } 
        
        var today = new Date();
        var afterThisDate = new Date();
        afterThisDate.setDate(today.getDate() - 60); //date 2 months ago
        var dateStr = afterThisDate.toISOString().split("T")[0];
        $.each(arrayOfMovies, function( index, value ) {            
            var query = [{"type": "/film/film","name": value,"/film/film/directed_by": null,"/film/film/initial_release_date>": dateStr,"/film/film/starring": [{"actor": null,"mid": null}]}];
            var service_url = 'https://www.googleapis.com/freebase/v1/mqlread';
            $.getJSON(service_url + '?callback=?', {query:JSON.stringify(query)}, function(response) {
                console.log(response);
                if(response.result.length != 0)
                {                    
                    $('<div>',{text:JSON.stringify(response.result[0]["/film/film/starring"])}).appendTo(document.body);
                    $('<br>').appendTo(document.body);
                    $('<br>').appendTo(document.body);
                }
            });
        });

    });    

});
