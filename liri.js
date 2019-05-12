//require("dotenv").config();
//var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var input = "";
var nodeArgs = process.argv;
var action = process.argv[2];

switch(action){
    case "concert-this":
    concert();
    break;

    case "spotify-this-song":
    spotify();
    break;

    case "movie-this":
    movie();
    break;

    case "do-what-it-says":
    whatever();
    break;

    default:
    console.log("After 'node liri.js' Please enter one of the following Commands: ");
    console.log("*movie");
    console.log("*concert");
    console.log("*spotify");
    console.log("*do-what-it-says")
    break;
};


function concert(){
    var queryURL = "https://rest.bandsintown.com/artists/" +
    input +
    "/events?app_id=codingbootcamp+limit=3";
    axios.get(queryUrl).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          console.log("==============================================");
          console.log("");
          console.log("- Name Of The Venue: " + response.data[i].venue.name);
          console.log("- Location Of The Venue: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
          console.log("- Date Of The Event: " + moment(response.data[i].datetime).toDate());
          console.log("");
          console.log("==============================================");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    }

    
function spotify(){
    var songName = ""
    for (var i = 3; i <nodeArgs.length; i++){
        if(i > 3 && i <nodeArgs.length) {
            songName + "+" + nodeArgs[i]; 
        }
        else {
            songName += nodeArgs[i];
        }
    }
    if (songName === "") {
        songName= "Live Wire";
    }
};


function movie() {
    var movieName = "";
    for (var i = 3; i <nodeArgs.length; i++){
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName += nodeArgs[i];
        }
    }
    if (movieName === "") {
        movieName= "Mr. Nobody";
    };
    var queryURL = "http://www.omdbapi.com/?i=tt3896198&apikey=7216f2f9" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(
        function(response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Yeare: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbrating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
            console.log("Movie Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
        }
    );
};
function whatever() {
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) return console.log(err);
      console.log(data);
      input = data;
      spotifyThis();
    })
  }
  