require('dotenv').config();

//require the axios package
var axios = require('axios');


// ----what to dos/actions-----



// user input from the command line.
var nodeArgv = process.argv;
// command line arg starts at 2.
var input= nodeArgv.slice(2);
var queryInput = '';

for ( var i = 2; i < nodeArgv.length; i ++){
    if (i >= 2 && i < nodeArgv.length){
        // if command line has more than 1 word, then add the + to every word from the command line inside the str
        queryInput = queryInput + '+' + input[i];
        }else{
            queryInput += query;
        }
    };

// switch (input){
//     case "movie-this":
//         movieThis();
//         break;
// };

// // function movieThis(){
// //     if (movies === ''){
// //         movies = 'Mr. Nobody';
// //     }

// var url= 'http://www.omdbapi.com/?t=' + input + '&apikey=trilogy';
   
//     axios.get(url).then(function(res){
//         if(input === undefined){
//             input = 'mr+nobody';
//         };
//         console.log('Year: ' + res.data.Year);
//         console.log('Title:' + res.data.Title);
//         console.log('The imdb rating: ' + res.data.imdbRating);
//         console.log('Country: ' + res.data.Country);
//         console.log('Language: ' + res.data.Language);
//         console.log('Plot: ' + res.data.Plot);
//         console.log(res.data.Actors);
//     });




 
// //---------------BANDSINTOWN---------------

// var artistStr='';
// var argv = process.argv;
// var artists = argv.slice(2);

// for (var j= 3; j<argv.length;j++){
//     if(j >= 3 && j < argv.length){
// artists = artistStr + '+' + argv[i]
//     }
// }; 

var bandUrl = 
"https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

axios.get(bandUrl).then(function(err,res,body){
    if (err){
        console.log(err + 'error occured');
    }else{
      console.log(res.body +'yay'); 
    //   console.log(res.data.venue.city +'yay'); 

    };
    
});
    