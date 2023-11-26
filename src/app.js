const express = require("express");
const app = express();
const routerRestaurants = require('./routes/restaurants.js')

app.use(express.json())
app.use('/restaurants', routerRestaurants)


module.exports = {app}