//

require('dotenv').config();
var keys = require("./keys.js");
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// user input from the command line. 
var nodeArgv = process.argv;
console.log(nodeArgv);
// command line arg starts at 2.

// var command = nodeArgv.slice(2);
var input= nodeArgv.slice(2).join("");
var queryInput = '';

// omdb working, only by itsel. when put in the fx, it breaks

// function movieThis(input){
//     if (input === ''){
//         input = 'mr+nobody';
//     }

    // var url= 'http://www.omdbapi.com/?t=' + input + '&apikey=trilogy';

    // axios.get(url).then(function(res){
        
    //     console.log('Year: ' + res.data.Year);
    //     console.log('Title:' + res.data.Title);
    //     console.log('The imdb rating: ' + res.data.imdbRating);
    //     console.log('Country: ' + res.data.Country);
    //     console.log('Language: ' + res.data.Language);
    //     console.log('Plot: ' + res.data.Plot);
    //     console.log(res.data.Actors);

    // });

 
// //---------------BANDSINTOWN---------------



// var bandUrl = 
// "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp#";

// axios.get(bandUrl).then(function( res){
    
//     var jData = res.data;
    
    
//     for (var i = 0; i < jData.length; i ++){
//         var date = jData[i].datetime;
//         var momentDate = moment(date).format('MMM Do yy, h:mm:ss a');
        
//         console.log('===============================');
//         console.log('Name of the venue: ' + jData[i].venue.name);
//         console.log('City of the venue: ' + jData[i].venue.city); 
//         console.log('Time of the venue: ' + momentDate);
//         console.log('---------------------------------'); 
//     }
   
//     })
//     .catch(function(err){
//         if(err){
//             console.log(err.res.data);
//             console.log(err.res.status);
//             console.log(err.res.headers);
//         }else if (err.request){
//             console.log(err.request);
//         }else{
//             console.log("Error", err.message);
//         }
//         console.log(err.config);
//     });


    //---------------SPOTIFY------------------
var base = 'https://api.spotify.com/v1/artists/99471d95db844a81a3b63d3b27d43b5e/'+ input;


// sample for album
//  GET https://api.spotify.com/v1/albums/

spotify.search({
    type:'track',
    query: 'all the small things',
    limit:15
},function(err,data){
    if(err){
        return console.log('Error occured: ' + err)
    }
    console.log(data);

});