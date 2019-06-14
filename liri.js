require("dotenv").config();
var request = require("request");
var keys = require('./keys.js')
var Spotify = require("node-spotify-api");
var moment = require("moment");

var userInput = process.argv[2];

function movieThis() {
    var thisMovie = process.argv[3]
    var queryUrl = "http://www.omdbapi.com/?t=" + thisMovie + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, (err, response, body) => {
        if (err) {
            return err;
        }
        if (response.statusCode === 200) {
            let json = JSON.parse(body);

            console.log(("Title: ") + json.Title);
            console.log(("Plot: ") + json.Plot);
            console.log(("Actors: ") + json.Actors);
            console.log(("Year Released: ") + json.Released);
            console.log(("IMDB Ratings: ") + json.imdbRating);
            console.log(("Country: ") + json.Country);
            console.log(("Language: ") + json.Language);
        }
    })
}


function concertThis() {
    var artist = process.argv[3]
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryUrl, (err, response, body) => {
        if (err) {
            return err;
        }
        if (response.statusCode === 200) {
            let json = JSON.parse(body);
            for (var i = 0; i < 5; i++) {

                console.log(("Venue: ") + json[i].venue.name);
                console.log(("Location: ") + json[i].venue.city);
                console.log((moment(json[i].datetime).format("MM/DD/YY")));   

            }
        }
    })
}

function spotifyThis() {
    var spotify = new Spotify(keys.spotify);
    var songName = process.argv[3];

    spotify.search({
        type: "track",
        query: songName,
    }, function (err, data) {
        if (err) {
            return err;
        }

        else {
            console.log(("Artist: ") + data.tracks.items[0].artists[0].name);
            console.log(("Song: ") + data.tracks.items[0].name);
            console.log(("Album: ") + data.tracks.items[0].album.name);
            console.log(("Preview: ") + data.tracks.items[0].preview_url);
        }
    })
}


function doThis() {
    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) {
            return console.log(error);
        } else {

        }

    })

}


///
switch (userInput) {

    case 'movie-this':
        movieThis();
        break;

    case 'concert-this':
        concertThis();
        break;

        case 'spotify-this-song':
        spotifyThis();
        break;

    case 'do-what-it-says':
        doThis();
        break;
}


