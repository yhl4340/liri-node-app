console.log('this is loaded');

var spotify = new Spotify(keys.spotify);

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
}
var keys = require("./keys.js");
 

// omdb
// http://www.omdbapi.com/?i=tt3896198&apikey=31239692