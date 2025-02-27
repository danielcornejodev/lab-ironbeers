const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { runInNewContext } = require('vm');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
// this line just sets hbs as the language for the views

app.set('views', path.join(__dirname, 'views'));
// this line ^ tells our app which folder to find out views 
// in when we run res.render

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('home');
});

app.get("/beers", (req, res)=>{
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    const allBeers = beersFromApi;
    res.render('beers', {allBeers})
  })
  .catch(error => console.log(error));
})

app.get("/random-beer", (req, res)=>{
  punkAPI
  .getRandom()
  .then(randomBeer => {
    console.log(randomBeer)

    const oneRandomBeer = randomBeer[0];
    res.render('random-beer', {oneRandomBeer})
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
