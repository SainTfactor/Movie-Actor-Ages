Movie Actor Ages
================

This application was put together as a sample application during the interview process with Xamarin.  It pulls a list of current movies (in theaters) then provides the average of the actors ages.

The project will be pure javascript just to keep things simple.  I intend to host [this project](http://saintfactorstudios.com/Movie-Actor-Ages/MovieActorAges.html) at the [SainTfactor Studios website](http://saintfactorstudios.com).

Pulling List of Current Movies
------------------------------

I used a nifty library developed by [James Padolsey](http://james.padolsey.com) to allow my code to run cross domain Ajax.  It uses a service that Yahoo offers to parse cross domain requests and forward you the responses.

I am pulling the movie list from [Google's movie page](http://google.com/movies) and parse out the movies that appear in theaters near the user.  I did it this way because in looking at the list of all movies that are currently in theaters, I found that many of the movies were limited release or not showing in the United States.  I thought I should only show movies that are relavant to the current user.

Pulling List of Actors in Said Movie
------------------------------------

The list of actors is pulled in from IMDb.  I had originally thought to use the IMDb API to pull the actors, but they only serve you the top 4.  As such, I had to scrape the IMDb page directly.  Luckily, Google's movie list (discussed above) included direct links to the IMDb page for the movie.  It was a small thing to get from there to the cast list.

Getting the Actors Ages in Said Movie
-------------------------------------

[TODO]

