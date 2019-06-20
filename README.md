# LIRI Node App
## Purpose
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node application that takes in parameters, communicate with othe APIs, and gives you back data. LIRI will communicate with APIs from Spotify, Bandsintown, and OMDB. 

## Overview
LIRI uses command line arguments to take in parameters to communicate with other APIs. If the user enters "movie-this" or "concert-this", LIRI will use Axios to communicate with OMDB or Bandsintown API to get data back from the search. If the user enters "spotify-this-song", LIRI will use the Spotify API to get data back about the song. LIRI is also able to parse a random.txt file for commands and execute them. Not only will the information be displayed on the Terminal, it will also be written to the log.txt file. 

## Usage
LIRI runs in the Terminal window. User must type "node liri-node-app.js" and enter one of the commands and the search content. All results are logged to the Terminal and written to log.txt for future reference.

### Commands:
* Concert-this: User must enter the name of an Artist as the search content. This command will communicate with the Bandsintown API and return information about the Name of the Venue, the Venue's location, and the Date of the concert. 

* Spotify-this-song: User must enter the name of a Song as the search content. This command will communicate with Spotify API and return information about the artist Name, Song name, a Preview URL on Spotify, and the Album the song is from. If no search content is entered, LIRI will automatically return information about "The Sign" by Ace of Base.

* Movie-this: User must enter the name of a Movie as the search content. This command will communicate with OMDB API and return information about the Title, Year of release, IMDB rating, Rotten Tomatoes rating, Country it was produced in, Plot, and list of actors. If no search content is entered, LIRI will automatically return information about "Mr Nobody".

* Do-what-it-says: No search input needed. LIRI will read the contents of random.txt and execute the commands listed in there automatically. Do-what-it-says is able to handle any of the above 3 commands on its own. 

## Examples
### Images:
* [Concert-This](https://github.com/saronnhong/liri-node-app/blob/master/assets/images/Concert-This.png)
* [Spotify-This-Song](https://github.com/saronnhong/liri-node-app/blob/master/assets/images/Spotify-This-Song.png)
* [Movie-This](https://github.com/saronnhong/liri-node-app/blob/master/assets/images/Movie-This.png)
* [Do-What-It-Says](https://github.com/saronnhong/liri-node-app/blob/master/assets/images/Do-What-It-Says.png)

### Video:
* [Demo](https://github.com/saronnhong/liri-node-app/blob/master/assets/images/Liri_demo_video.mov)

## Technologies
LIRI was created using these technologies
* JavaScipt
* Node.js
* API
    * Node-Spotify
    * OMDB
    * Bandsintown
* NPM JS Packages
    * Axios
    * Dotenv
    * MomentJS
    * FS

## GITHUB
[github link](https://github.com/saronnhong/liri-node-app)

## My Role
My role in the app development was to create the LIRI app based on instructions from UCSD Extension Full Stack Bootcamp.