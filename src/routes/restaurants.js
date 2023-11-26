const express = require("express");
const { Restaurant, Menu, Item } = require("../../models/index.js")
const { db } = require("../../db/connection.js");
const router = express.Router()
const { check, validationResult } = require('express-validator')

router.use(express.json())
router.use(express.urlencoded())

router.get('/', async(req, res) => { 
    const restaurantList = await Restaurant.findAll(
        {
            include: Menu, 
            include: [{
                model: Menu, 
                include: [{
                    model: Item
                }]
            }]
        })
    res.json(restaurantList)
    res.status(200)
})

//TODO: Create your GET Request Route Below: 
router.get('/:id', async(req,res) => { 
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.json(restaurant)
})

router.post('/', 
    [check("name").not().isEmpty(),
    check("location").not().isEmpty(),
    check("cuisine").not().isEmpty()],
    async(req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.json({ errors: errors.array() })
      } else {
            const restaurant = await Restaurant.create(req.body)
    
            if(restaurant.name === null){
                res.sendStatus(404)
            }
    
            res.json(restaurant)
    } 
})

router.put('/:id', async(req, res) => { 
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

router.delete('/:id', async(req, res) => { 
    try{
         await Restaurant.destroy({
            where: { id: req.params.id },
        })
        
        res.sendStatus(200)

    } catch(error){
        console.log(error)
    }
})



module.exports = router;