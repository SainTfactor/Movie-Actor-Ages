$(function() {

    var arrayOfMovies = new Array(); // array of currently playing movies
	var zipCode = "";    

    $("#zipCode").on("keyup", function () {
        if ($("#zipCode").val().length == 5) {
			
			zipCode = $("#zipCode").val();
            $("body").html("");

			//note, getMovies will call getactors and getages
			//		because they depend on one another and
			//		are asynchronus
			getMovies();              
        }
    });


	function getMovies()
	{
		//fetch the list of relevant movies from google.
		$.ajax({
		    url: "http://www.google.com/movies",
		    type: "GET",
		    data: { "near" : zipCode },
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
		            var imdbPage; // google was nice enough to provide us with direct links to the imdb page.
		            var movieName = $(movie).find(".name a")[0].innerHTML;

		            if ($(movie).find(".info a")[0].innerHTML == "IMDb")
		                imdbPage = $($(movie).find(".info a")[0]).attr("href").split("?q=")[1].split("&")[0] + "fullcredits";
		            else
		                imdbPage = $($(movie).find(".info a")[1]).attr("href").split("?q=")[1].split("&")[0] + "fullcredits";

		            //test and see if we already have them in the list
		            var isInArray = false;
		            for (var k = 0; k < arrayOfMovies.length; k++) {
		                if (arrayOfMovies[k][0] == movieName) isInArray = true;
		            }

		            if (!isInArray) {
		                //$('<div>', { text: movieName, id: movieName.replace(/\s+|\.+|\,+/g, "") }).appendTo(document.body);
		                $('<div id="'+movieName.replace(/\s+|\.+|\,+/g, "")+'"><span>'+movieName+'</span></div>').appendTo(document.body);

		                arrayOfMovies[arrayOfMovies.length] = [movieName, imdbPage];
		            }
		        }
		        // same as above but for the right column
		        for(var j = 0; j < $(theater).find(".showtimes .show_right .movie").length; j++)
		        {
		            var movie = $(theater).find(".showtimes .show_right .movie")[j];
		            var imdbPage; // google was nice enough to provide us with direct links to the imdb page.
		            var movieName = $(movie).find(".name a")[0].innerHTML;

		            if ($(movie).find(".info a")[0].innerHTML == "IMDb")
		                imdbPage = $($(movie).find(".info a")[0]).attr("href").split("?q=")[1].split("&")[0] + "fullcredits";
		            else
		                imdbPage = $($(movie).find(".info a")[1]).attr("href").split("?q=")[1].split("&")[0] + "fullcredits";

		            //test and see if we already have them in the list
		            var isInArray = false;
		            for (var k = 0; k < arrayOfMovies.length; k++) {
		                if (arrayOfMovies[k][0] == movieName) isInArray = true;
		            }

		            if (!isInArray) {
		                //$('<div>', { text: movieName, id: movieName.replace(/\s+|\.+|\,+/g, "") }).appendTo(document.body);
		                $('<div id="'+movieName.replace(/\s+|\.+|\,+/g, "")+'"><span>'+movieName+'</span></div>').appendTo(document.body);

		                arrayOfMovies[arrayOfMovies.length] = [movieName, imdbPage];
		            }
		        }
		    } 

			getActors();
        
		});
	}

	function getActors()
	{
	    for (var i = 0; i < arrayOfMovies.length; i++) {
	        //fetch the list of actors from imdb.
	        $.ajax({
	            url: arrayOfMovies[i][1],
	            type: "GET",
	            data: { "name": arrayOfMovies[i][0] },
	        })
	        .done(function (newData) {

	            // pull out the relevant data
	            var movieName = decodeURIComponent(decodeURIComponent(this.url).split("?name=")[1].split("\"")[0].replace(/\+/g, " "));
	            var movieID = movieName.replace(/\s+|\.+|\,+/g, "");
	            var castList = $($.parseHTML(newData.results[0].replace(/src/g, "src-none"))).find("table.cast_list")[0];				


	            // add the tables to the page
	            $("#" + movieID).html($("#" + movieID).html() + "<table style='display:none;'>" + castList.innerHTML + "</table>");
				$("#" + movieID).find(".primary_photo").remove();
				$("#" + movieID).find(".ellipsis").remove();
				$("#" + movieID).find(".character div p").remove();
				$("#" + movieID).find("tbody tr:not([class])").remove();


	            // fix the links
	            $("#" + movieID + " a").attr("href", "http://www.imdb.com" + $("#" + movieID + " a").attr("href"))

				getAges(movieID);

	        });
	    }
	}

	function getAges(movieIDo)
	{		
		for(var i = 0; i < $("#" + movieIDo + " td.itemprop").length; i++)
		{
			var link = $($("#" + movieIDo + " td.itemprop")[i]).find("a").attr("href").split("?")[0];

	        $.ajax({
	            url: link,
	            type: "GET",
	            data: { "name": movieIDo + "--" + i },
	        })
	        .done(function (newData) {
				var parsedHTML = $($.parseHTML(newData.results[0].replace(/src/g, "src-none")));

	            var movieName = decodeURIComponent(decodeURIComponent(this.url).split("?name=")[1].split("\"")[0].split("--")[0].replace(/\+/g, " "));
	            var movieID = movieName.replace(/\s+|\.+|\,+/g, "");
	            var actorIndex = decodeURIComponent(decodeURIComponent(this.url).split("?name=")[1].split("\"")[0].split("--")[1]);
	            var dateOfBirth = $(parsedHTML.find('a[href*="/search/name?birth_monthday"]')[0]).html();	
	            var yearOfBirth = $(parsedHTML.find('a[href*="/search/name?birth_year"]')[0]).html();	
				var dobString = dateOfBirth + ", " + yearOfBirth;
				var age = Math.floor(((new Date()) - (new Date(dobString)))/31536000000) 
				
				$('<td>', { text: dateOfBirth, class: "actorAge" }).appendTo($($("#" + movieID + " td.itemprop")[actorIndex]).parent())
			});
		}				
	}

});



function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
