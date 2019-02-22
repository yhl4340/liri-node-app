//all the packages

require('dotenv').config();
var keys = require("./keys.js");
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var inquirer = require('inquirer');
var request = require('request');


// user input from the command line. 
var nodeArgv = process.argv;
// command line arg starts at 2.
var command = nodeArgv.slice(2);
// user input will be at #3 spot
var input= nodeArgv.slice(3).join(" ");
console.log(command);
console.log(input);

run(command);


// --------------------------ALL THE X-THIS FUNCTIONS--------------------------------------

    function movieThis(movieTitle){
        // if no user input, then return mr nobody.**changed the input name to 
        // movieTitle to avoid hoisting and now movieThis function works.
        if (!movieTitle){
            movieTitle = 'mr+nobody';
        }
        var url= 'http://www.omdbapi.com/?t=' + movieTitle + '&apikey=trilogy';

        axios.get(url).then(function(res){    
            console.log('Year: ' + res.data.Year);
            console.log('Title:' + res.data.Title);
            console.log('The imdb rating: ' + res.data.imdbRating);
            console.log('Country: ' + res.data.Country);
            console.log('Language: ' + res.data.Language);
            console.log('Plot: ' + res.data.Plot);
            console.log(res.data.Actors);

        });
    };

    function concertThis(concert){
        if(!concert){
            concert = 'The+Sign';
        }
        var bandUrl = 
        "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp#";
        console.log(bandUrl);
        // looping through the response and print out the value of datetime prop. 
        // conver the time with moment.js
        axios.get(bandUrl).then(function( res){
            var jData = res.data;
            for (var i = 0; i < jData.length; i ++){
                var date = jData[i].datetime;
                var momentDate = moment(date).format('MMM Do yy, h:mm:ss a');
                
                console.log('===============================');
                console.log('Name of the venue: ' + jData[i].venue.name);
                console.log('City of the venue: ' + jData[i].venue.city); 
                console.log('Time of the venue: ' + momentDate);
                console.log('---------------------------------'); 
            }
        })
            .catch(function(err){
                if(err){
                    console.log(err.res.data);
                    console.log(err.res.status);
                    console.log(err.res.headers);
                }else if (err.request){
                    console.log(err.request);
                }else{
                    console.log("Error", err.message);
                }
                console.log(err.config);
            });
    };


    //??????????????????????/SPOTIFY-not working???????????????
    //  var base = 'https://api.spotify.com/v1/artists/99471d95db844a81a3b63d3b27d43b5e/'+ input;
    // sample for album
    //  GET https://api.spotify.com/v1/albums/

    function spotThis(spotTitle){
        if(!spotTitle){
            spotTitle = 'The+Sign';
        }
        spotify.search({
            type:'track, artist',
            query: spotTitle
        }).then(function(err,data){
            if(err){
                return console.log('Error occured: ' + err)
            }
            var currData = data.tracks;
            for (var i = 0; i < currData[i]; i++){
            console.log(currData.items[0].artists[0].name);
                console.log(currData.items[0].name);
                console.log(currData.items[0].preview_url);
                console.log(currData.items[0].album.name);      
            }
        
        });
    };

    function doThis(doData){
        fs.appendFile('random.txt',doData, function(err){
            if(err){
                console.log(err)
            }else {
            console.log('added')
            }

        });
    };


    // using the inquirer package to prompt user on page load. create an obj with questions
    inquirer.prompt([{
        type:'list',
        name:'command',
        message:'what do you want to do ?',
        choices:['movie-this','concert-this','spotify-this-song', 'do-what-it-says']
    }
    ])
    .then(function(inquirerResponse) {
        run(inquirerResponse.command);
    });

    
    // --------------SEARCH FUNCTIONS--------------
    function movieSearch (){
        inquirer.prompt([{
            type:'input',
            name:'searchTerm',
            message:'what would you like to search for?'
        }
        ])
        .then(function(inquirerResponse) {
        var searchTerm = inquirerResponse.searchTerm;
        movieThis(searchTerm);
        });
    }

    function concertSearch (){
        inquirer.prompt([{
            type:'input',
            name:'searchTerm',
            message:'what would you like to search for?'
        }
        ])
        .then(function(inquirerResponse) {
        var searchTerm = inquirerResponse.searchTerm;
        concertThis(searchTerm);
        });
    };


    //????????????????spotify not working??????????????????
    function spotSearch() {
        inquirer.prompt([{
            type:'input',
            name:'searchTerm',
            message:'what would you like to search for?'
        }
        ])
        .then(function(inquirerResponse){
            var searchTerm= inquirerResponse.searchTerm;
            spotThis(searchTerm);
            console.log(searchTerm)
        })
    };

    function doWhatItSaysSearch(){
        inquirer.prompt([{
            type:'input',
            name:'searchTerm',
            message:'What do you want Liri to do?'
        }
        ])
        .then(function(inquirerResponse){
            var searchTerm= inquirerResponse.searchTerm;
            var searchTermAbbrv = searchTerm.split(',').join('') +'\n';
            doThis(searchTermAbbrv);
        })
    };

    // ----------------SWITCH STATEMENT-------------
    function run(command){
        switch(command){
            case 'movie-this':
                movieSearch();
                break;
            case 'concert-this':
                concertSearch();
                break;
            case 'spotify-this-song':
                spotSearch();
                break;
            case 'do-what-it-says':
                doWhatItSaysSearch();
                break;
            default:
                break;
        }
    };

