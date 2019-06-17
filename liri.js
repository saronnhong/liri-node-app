require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

var firstArg = process.argv[2];

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function callSpotify(spotCallQuery) {
    spotify
        .search({ type: 'track', query: spotCallQuery })
        .then(function (response) {
            console.log(response.tracks.items.length);
            // checks if there was a result to the search
            if (response.tracks.items.length) {

                for (var i = 0; i < response.tracks.items.length; i++) {
                    console.log("Artist: " + response.tracks.items[i].album.artists[0].name);
                    console.log("Song name: " + response.tracks.items[i].name);
                    console.log("Preview URL: " + response.tracks.items[i].preview_url);
                    console.log("Album name: " + response.tracks.items[i].album.name);
                    console.log(" ");
                }
            }
            else {
                //if no result was found in the search
                //console.log("no results returned");
                var spotQuery = "the sign ace of base"
                callSpotify(spotQuery);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}
function callImdbSearch(movieNameSearch) {
    var imdbQueryUrl = "http://www.omdbapi.com/?t=" + movieNameSearch + "&y=&plot=short&apikey=trilogy";

    axios
        .get(imdbQueryUrl)
        .then(function (response) {
            if (movieNameSearch === undefined) {
                console.log("no input");
                movieNameSearch = 1;
                callImdbSearch("Mr. Nobody");
            }
            else {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log(" ");
            }

        })
}
function callConcertSearch(artistSearch) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistSearch + "/events?app_id=codingbootcamp";

    axios
        .get(queryUrl)
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date/Time: " + moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("L"));
                console.log(" ");
            }
        });
}


if (firstArg === "concert-this") {
    var artist = process.argv[3];
    callConcertSearch(artist);


} else if (firstArg === "spotify-this-song") {

    var spotQuery = process.argv[3];
    callSpotify(spotQuery);

    // Client ID e3083f86ff4b4021af54da8ccdf4134a
    // Client Secret 0285f828935e47c9950111fa3447ad4d
} else if (firstArg === "movie-this") {
    var movieName = process.argv[3];
    callImdbSearch(movieName);
} else if (firstArg === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArray = data.split(",");
        //console.log(dataArray);

        for (var i = 0; i < dataArray.length; i++) {
            console.log(dataArray[i]);
            if (dataArray[i] === "spotify-this-song") {
                callSpotify(dataArray[i + 1]);
            } else if (dataArray[i] === "movie-this") {
                callImdbSearch(dataArray[i + 1]);
            } else if (dataArray[i] === "concert-this") {
                
                callConcertSearch(dataArray[i + 1]);
            }
        }
    })
}
