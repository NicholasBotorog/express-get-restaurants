const { Restaurant, Item, Menu } = require("./models/index")
const { seedRestaurant, seedItem, seedMenu } = require("./seedData");
const db = require("./db/connection")

const syncSeed = async () => {
    await db.sync({force: true});
    await Restaurant.bulkCreate(seedRestaurant)
    // BONUS: Update with Item and Menu bulkCreate
    await Menu.bulkCreate(seedMenu)
    await Item.bulkCreate(seedItem)
}

syncSeed()

module.exports = {syncSeed}