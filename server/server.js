const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movies = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
  /* Task 1.2. Remove the line below and eturn the movies from 
     the model as an array */
  app.get('/movies', function (req, res) {
  const moviesArray = Object.values(movies)
  res.send(moviesArray)
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1. Remove the line below and add the 
    functionality here */
  const id = req.params.imdbID
const movie = movies[id]

if (movie) {
  res.send(movie)
} else {
  res.sendStatus(404)
}
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */
app.put('/movies/:imdbID', function (req, res) {
  const id = req.params.imdbID
  const movie = req.body

  if (movies[id]) {
    // Update
    movies[id] = movie
    res.sendStatus(200)
  } else {
    // Create
    movies[id] = movie
    res.status(201).send(movie)
  }
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

