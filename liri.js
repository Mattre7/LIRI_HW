require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var keys = require("./keys")
var spotifykey = new Spotify(keys.spotify);
var twitterkey = new Twitter(keys.twitter);

var arg1 = process.argv[2];
var arg2 = process.argv[3]

function songRequest() {
    if (arg2 === undefined) {
        console.log("No song was searched")
    }
    spotifykey
        .search({
            type: "track",
            query: search,
            limit: 1
        })
        .then(function (response) {
            console.log(response.tracks.items[0]);
            console.log(response.track.items[0].artists[0].name);

        })
}

function recentTweets() {
    
}

function thisMovie() {
    if (arg2 === undefined) {
        console.log("You did not search for a movie")
    }
    var queryurl = "http://www.omdbapi.com/?t=${arg2}&y=&plot=short&apikey=trilogy"
    request(queryurl, function (error, response, body) {
        if (err) {throw err}
        else {
           var body = JSON.parse(body);
           var title = "Title: " + body.Title;
           var year = "Year: " + body.Year;
           console.log(body)
        }
    });
}
