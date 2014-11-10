$(function() {
    
   var arrayOfMovies = new Array();
    
    $.ajax({
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
        
        console.log(arrayOfMovies);
    });
    
    /*$.getJSON("http://moviefone.com/showtimes?locationQuery=36830", function(response) {
        $.each(response.result, function(i,planet){
            $('<div>').appendTo(document.body);
        });
    });*/
    
    

});
