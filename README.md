# liri-node-app
##Goal
-To create an app that will allow you to query the following sites using node.js
    *OMDB
    *Bands in Town
    *Spotify
    *using the fs to generate info based on the command in the random.txt

##The App
-OMBD
    -if a movie name is passed in, then query will return:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
    -if no value passed in:
        * will return info for the movie " Mr. No body"
    
-Bands in Town
    -if a song is passed in, then query will return:
        *Name of the venue
        *Venue location
        *Date of the Event (use moment to format this as "MM/DD/YYYY")

-Spotify
    -if a song or an artist is passed in, then query will return:
        *Artist(s)
        *The song's name
        *A preview link of the song from Spotify
        *The album that the song is from 
    -else:
        *info for 'The Sign" by Ace of Base will be returned

-Do-What-say
    -A different way to make the same queries as above. Liri will read the command in the random.txt and query. 


## Link to app
https://drive.google.com/file/d/1j60R560w64AzDF2JBAD2IuUitdK5XPFv/view


