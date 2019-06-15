require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');

var firstArg = process.argv[2];

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// 1. node liri.js concert-this <artist/band name here>
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

if (firstArg === "concert-this") {
    var artist = process.argv[3];
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios
        .get(queryUrl)
        .then(function (response) {
            console.log(response.data[0]);
            for (var i = 0; i < response.data.length; i++) {

                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date/Time: " + moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("L"));
                console.log(" ");
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

} else if (firstArg === "spotify-this-song") {
    console.log("spot check");
    var spotQuery = process.argv[3];
    spotify
        .search({ type: 'track', query: spotQuery })
        .then(function (response) {
            //console.log(response.tracks);

            for (var i = 0; i < response.tracks.items.length; i++) {
                console.log("Artist: " + response.tracks.items[i].album.artists[0].name);
                console.log("Song name: " + response.tracks.items[i].name);
                console.log("Preview URL: " + response.tracks.items[i].preview_url);
                console.log("Album name: " + response.tracks.items[i].album.name);
                console.log(" ");
            }
           //console.log(response.tracks.items[0]);
        })
        .catch(function (err) {
            console.log(err);
        });
    // 2. node liri.js spotify-this-song '<song name here>'
    // This will show the following information about the song in your terminal/bash window
    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    // You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
    // The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
    // Step One: Visit https://developer.spotify.com/my-applications/#!/
    // Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
    // Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
    // Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
    // Client ID e3083f86ff4b4021af54da8ccdf4134a
    // Client Secret 0285f828935e47c9950111fa3447ad4d
}
