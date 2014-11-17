Movie Actor Ages
================

This application was put together as a sample application during the interview process with Xamarin.  It pulls a list of current movies (in theaters) then provides the average of the actors ages.

The project will be pure Javascript just to keep things simple.  I intend to host [this project](http://saintfactorstudios.com/Movie-Actor-Ages/MovieActorAges.html) at the [SainTfactor Studios website](http://saintfactorstudios.com).

Pulling List of Current Movies
------------------------------

I used a nifty library developed by [James Padolsey](http://james.padolsey.com) to allow my code to run cross domain AJAX.  It uses a service that Yahoo offers to parse cross domain requests and forward you the responses.

I am pulling the movie list from [Google's movie page](http://google.com/movies) and parse out the movies that appear in theaters near the user.  I did it this way because in looking at the list of all movies that are currently in theaters, I found that many of the movies were limited release or not showing in the United States.  I thought I should only show movies that are relevant to the current user.

Pulling List of Actors in Said Movie
------------------------------------

The list of actors is pulled in from IMDb.  I had originally thought to use the IMDb API to pull the actors, but they only serve you the top 4.  As such, I had to scrape the IMDb page directly.  Luckily, Google's movie list (discussed above) included direct links to the IMDb page for the movie.  It was a small thing to get from there to the cast list.

Note: If you use this outside of the US, it's a bit hairy.  Because the movies have translated names, Google doesn't tie them to the appropriate IMDb page.  I may go back and add some stuff to check for that, but since it works in the US at the moment I'm putting that on the back burner.

Getting the Actors Ages in Said Movie
-------------------------------------

Since I had a list of links to the actor's IMDb pages (from the table I fetched in the previous step), I decided to just pull their age information from there.  I set up another round of AJAX calls that pulled the actors information pages, and I pulled their DOB information from there.

Once I got the actor's age, I added it to a hidden table associated with the movie.  Given more time I probably would have made this table into a fancy clickable accordion so you could see all the information, but I thought that was a bit outside the scope of the project, and I was running low on time.  If you want to see the age information for the actors, just reveal those tables.  They don't have any fancy styling, so they won't be very pretty.

Things to Note
--------------

* This project has 2 sets of the same code, the only difference being the styles applied to them.  If you want to run this code on your local machine, use the files in the root folder of this project (simply open the MovieActorAges.html file in the browser of your choice (only tested in Google Chrome)).
* I have the project hosted at [SainTfactorStudios.com](http://saintfactorstudios.com) which is running on a server without 100% guaranteed up-time.  As such, you may not be able to access this project from there all the time.  I try to keep my A Record up to date, and prevent the server from crashing too often.  So if you 404 when trying to take a look at the project, I apologize for the inconvenience
* This project runs a bit slow.  It takes about 2 minutes to finish populating the whole list.  If I was going to put this in a production environment, I would create the web scraping portion of this project as a separate entity that stores the data it retrieves in a database which the front end application would call from.  That way the wait time fetching the information isn't felt by the end user.
* This program is wholly dependent on Google Movies and IMDb for it's information.  If either site makes a change to how they display data or where they display data to, this project will break down.
* This project won't scale very well.  I am already pushing what is acceptable in terms of the wait time for results, so if there is a week where 50 movies are showing in your area, don't expect snappy results from my code.


