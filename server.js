const { Restaurant }  = require('./models/Restaurant')

const {app} = require("./src/app")
const db = require("./db/connection");
const port = 3000;

//TODO: Create your GET Request Route Below: 
app.use('/restaurants', async(req, res) => { 
    const restaurantList = await Restaurant.findAll()
    res.json(restaurantList)
    res.status(200)
})



app.listen(port, () => {
    db.sync();
    console.log(`Listening at http://localhost:${port}/restaurants`);
})