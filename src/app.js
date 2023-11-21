const express = require("express");
const app = express();
const {Restaurant} = require("../models/index")
const {db} = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get('/restaurants/:id', async(req,res) => { 
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.json(restaurant)
})

app.use(express.json())
app.use(express.urlencoded())

app.post('/restaurants', async(req,res)=>{
    try{
        const restaurant = await Restaurant.create(req.body)

        if(restaurant.name === null){
            res.sendStatus(404)
        }

        res.send(restaurant)
    } catch(error){
        console.log(error)
    }
})

app.put('/restaurants/:id', async(req, res) => { 
    try{
        const updated = await Restaurant.update(req.body, {
            where: { id: req.params.id },
        })
        
        res.sendStatus(200)
        res.send(updated)

    } catch(error){
        console.log(error)
    }
})

app.delete('/restaurants/:id', async(req, res) => { 
    try{
        const updated = await Restaurant.destroy({
            where: { id: req.params.id },
        })
        
        res.sendStatus(200)

    } catch(error){
        console.log(error)
    }
})



module.exports = app;