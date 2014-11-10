$(function() {

    var arrayOfMovies = new Array(); // array of currently playing movies
    var arrayOfActors = new Array(); // array of currently playing movies
    
    //fetch the list of relevant movies from google.
    $.ajax({
        url: "http://www.google.com/movies",
        type: "GET",
        data: { "near" : "36375" },
    })
    .done(function(data) {
        // once the response is in, it's time to parse
        
        var html = $.parseHTML(data.results[0]); // get the response formatted as html
        
        // lets iterate across each nearby theater
        for(var i = 0; i < $(html).find("div.theater").length; i++)
        {
            var theater = $(html).find("div.theater")[i];
            
            // it devides it into two columns, so I am parsing across each
            for(var j = 0; j < $(theater).find(".showtimes .show_left .movie").length; j++)
            {
                // get all the movies
                var movie = $(theater).find(".showtimes .show_left .movie")[j];
                //test and see if we already have them in the list
                if($.inArray($(movie).find(".name a")[0].innerHTML, arrayOfMovies))
                    arrayOfMovies[arrayOfMovies.length] = $(movie).find(".name a")[0].innerHTML; // add them to the list
            }
            // same as above but for the right column
            for(var j = 0; j < $(theater).find(".showtimes .show_right .movie").length; j++)
            {
                var movie = $(theater).find(".showtimes .show_right .movie")[j];
                if($.inArray($(movie).find(".name a")[0].innerHTML, arrayOfMovies))
                    arrayOfMovies[arrayOfMovies.length] = $(movie).find(".name a")[0].innerHTML;
            }
        } 
        
        // declaring some dates to make sure we get the most recent movie with this name
        // I realized this was necessary when I saw there were 4 movies with the title "Oujia" in the past 11 years
        var today = new Date();
        var afterThisDate = new Date();
        afterThisDate.setDate(today.getDate() - 60); //date 2 months ago (i figured that gave us enough breathing room for "still in theaters")
        var dateStr = afterThisDate.toISOString().split("T")[0]; // ISO timestring parsing
        $.each(arrayOfMovies, function( index, value ) { 
            // freebase MQL query to pull the actors names.  Due to the freebase structure, I can't pull their Dates of Birth at the same time.
            var query = [{"type": "/film/film","name": value,"/film/film/directed_by": null,"/film/film/initial_release_date>": dateStr,"/film/film/starring": [{"actor": null,"mid": null}]}];
            var service_url = 'https://www.googleapis.com/freebase/v1/mqlread';
            $.getJSON(service_url + '?callback=?', {query:JSON.stringify(query)}, function(response) {
                if(response.result.length != 0)
                {                    
                    // just stringifying for now.  Ill make it pretty later
                    $('<div>',{text:JSON.stringify(response.result[0]["/film/film/starring"])}).appendTo(document.body);
                    $('<br>').appendTo(document.body);
                    $('<br>').appendTo(document.body);
                }
            });
        });

        
        // TODO: get the dates of birth here
        
        
    });    

});
