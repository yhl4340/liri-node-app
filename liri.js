//all the packages

require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");

// // --------------------------ALL THE 'X-THIS' FUNCTIONS--------------------------------------

function movieThis(movieTitle) {
  // if no user input, then return mr nobody.**changed the input name to
  // movieTitle to avoid hoisting and now movieThis function works.
  if (!movieTitle) {
    movieTitle = "mr+nobody";
  }
  var url = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

  axios.get(url).then(function(res) {
    console.log("Year: " + res.data.Year);
    console.log("Title:" + res.data.Title);
    console.log("The imdb rating: " + res.data.imdbRating);
    console.log("Country: " + res.data.Country);
    console.log("Language: " + res.data.Language);
    console.log("Plot: " + res.data.Plot);
    console.log(res.data.Actors);
  });
}

function concertThis(concert) {
  if (!concert) {
    concert = "The+Sign";
  }
  var bandUrl =
    "https://rest.bandsintown.com/artists/" +
    concert +
    "/events?app_id=codingbootcamp#";
  console.log(bandUrl);
  // looping through the response and print out the value of datetime prop.
  // conver the time with moment.js
  axios
    .get(bandUrl)
    .then(function(res) {
      var jData = res.data;
      for (var i = 0; i < jData.length; i++) {
        var date = jData[i].datetime;
        var momentDate = moment(date).format("MMM Do YYYY, h:mm:ss a");

        console.log("===============================");
        console.log("Name of the venue: " + jData[i].venue.name);
        console.log("City of the venue: " + jData[i].venue.city);
        console.log("Time of the venue: " + momentDate);
        console.log("---------------------------------");
      }
    })
    .catch(function(err) {
      if (err) {
        console.log(err.res.data);
        console.log(err.res.status);
        console.log(err.res.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("Error", err.message);
      }
      console.log(err.config);
    });
}

//  var base = 'https://api.spotify.com/v1/artists/99471d95db844a81a3b63d3b27d43b5e/'+ input;
// sample for album
//  GET https://api.spotify.com/v1/albums/

function spotThis(spotTitle) {
  if (!spotTitle) {
    spotTitle = "ace+of+base+The+Sign";
  }
  spotify
    .search({
      type: "track",
      query: spotTitle
    })
    // had to comment out the 'err' because the err was actually the data needed.
    .then(function(data) {
    //   if (err) {
    //     return console.log("Error occured: " + JSON.stringify(err));
    //   }
      var items = data.tracks.items;
      for (var i = 0; i < items.length; i++) {
        console.log('-----------------------------------');
        console.log(items[i].artists[0].name);
        console.log(items[i].name);
        console.log(items[i].preview_url);
        console.log(items[i].album.name);
        console.log('====================================');
      }
    });
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    var dataArr = data.split(",");
    // console.log("dataArr:" + JSON.stringify(dataArr));
    if (err) {
      console.log(err);
    } else {
      run(dataArr[0], dataArr[1]);
    }
  });
}

// // --------------SEARCH FUNCTIONS--------------
function movieSearch() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "searchTerm",
        message: "what would you like to search for?"
      }
    ])
    .then(function(inquirerResponse) {
      var searchTerm = inquirerResponse.searchTerm;
      movieThis(searchTerm);
    });
}

function concertSearch() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "searchTerm",
        message: "what would you like to search for?"
      }
    ])
    .then(function(inquirerResponse) {
      var searchTerm = inquirerResponse.searchTerm;
      concertThis(searchTerm);
    });
}

function spotSearch() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "searchTerm",
        message: "what would you like to search for?"
      }
    ])
    .then(function(inquirerResponse) {
      var searchTerm = inquirerResponse.searchTerm;
      spotThis(searchTerm);
      console.log(searchTerm);
    });
}

function doWhatItSaysSearch() {
  doThis();
}

// // ----------------SWITCH STATEMENT-------------
function run(command, data) {
  switch (command) {
    case "movie-this":
    //   if there is data passed in, then use the data
      if (data) {
        movieThis(data);
      } else {
        movieSearch();
      }
      break;

    case "concert-this": 
      if(data){ 
        console.log("data:" + data);
         concertThis(data);
      }else {
           concertSearch();
      }
      break;

    case "spotify-this-song":
      if(data){
          spotThis(data);
      } else {
        spotSearch();
      }
      break;

    case "do-what-it-says":
      doWhatItSaysSearch();
      break;

    default:
      break;
  }
}
// using the inquirer package to prompt user on page load. create an obj with questions
inquirer
  .prompt([
    {
      type: "list",
      name: "command",
      message: "what do you want to do ?",
      choices: [
        "movie-this",
        "concert-this",
        "spotify-this-song",
        "do-what-it-says"
      ]
    }
  ])
  .then(function(inquirerResponse) {
    run(inquirerResponse.command);
  });
