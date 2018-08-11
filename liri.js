require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var moment = require("moment");
var fs = require("fs")

var keys = require("./keys")
var spotifykey = new Spotify(keys.spotify);
var twitterkey = new Twitter(keys.twitter);

var arg1 = process.argv[2];
var arg2 = process.argv.slice(3).join(" ");

var twitterParams = {
    screen_name: "fakeuser1447",
    count: 20
}

var spotifyParams = {
    type: "track",
    query: arg2,
    limit: 5
}

function songRequest() {
    if (arg2 === "") {
        console.log("No song was searched")
    }
    else {
    spotifykey
        .search(spotifyParams, function(err, response, body) {
            if (err) { throw err }
            // console.log(response.tracks.items[0])
            console.log("\n")
            console.log("-----------------------")
            console.log("\n")
            console.log("Song Title: " + response.tracks.items[0].name)
            console.log("Album: " + response.tracks.items[0].album.name)
            console.log("Artist: " + response.tracks.items[0].artists[0].name)
            console.log("Preview Link: " + response.tracks.items[0].preview_url)
            console.log("\n")
            console.log("-----------------------")
            console.log("\n")
        })
    }
}

function movieThis() {
    var queryurl = "http://www.omdbapi.com/?t="+arg2+"&y=&plot=short&apikey=trilogy"
    if (arg2 === "") {
        console.log("You did not search for a movie")
    }
    else {
    request(queryurl, function (err, response, body) {
        if (err) {throw err}
        else {
           var body = JSON.parse(body);
           console.log("\n")
           console.log("-----------------------")
           console.log("\n")
           console.log("Title: " + body.Title)
           console.log("Year Released: " + body.Year)
           console.log("Rated: " + body.Rated)
           console.log("IMDB Rating: " + body.imdbRating)
           console.log("Country: " + body.Country)
           console.log("Language: " + body.Language)
           console.log("Plot: " + body.Plot)
           console.log("Actors: " + body.Actors)
           console.log("\n")
           console.log("-----------------------")
           console.log("\n")
        };
    });
    }  
};

function recentTweets() {
    twitterkey.get("statuses/user_timeline", twitterParams, function (err, tweets, response) {
        if (err) {throw err}
        for (var i = 0; i<tweets.length; i++) {
            var converteddate = moment(tweets[i].created_at, "ddd MMM D HH:mm:ss ZZ YYYY").format('MMMM Do YYYY, h:mm a')
            // console.log(tweets[i])
            console.log("-----------------------")
            console.log("\n")
            console.log("@"+twitterParams.screen_name + ": " +tweets[i].text + "\nDate: " + converteddate)
            console.log("\n")
            console.log("-----------------------")
        }
    })
}

function random() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {throw err}
        else {
            var randomArray = data.split(",")
        arg2=randomArray[1]
        }
        if (randomArray[0] === "spotify-this-song") {
            spotifyParams = {
                type: "track",
                query: randomArray[1],
                limit: 5
            }
            songRequest();
        }
    })
}

function log() {
    fs.appendFile("log.txt", "Command: "+arg1+arg2+"\n", function (err) {
        if (err) {throw err}
    });
}

if (arg1 === "my-tweets") {
    log();
    recentTweets();
}

if (arg1 === "movie-this") {
    log();
    movieThis()
}

if (arg1 === "spotify-this-song") {
    log();
    songRequest();
}

if (arg1 === "do-what-it-says") {
    log();
    random();
}  