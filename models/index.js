const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')


Menu.belongsTo(Restaurant)
Restaurant.hasMany(Menu)

Item.belongsToMany(Menu, { through: 'Menu-Item '})
Menu.belongsToMany(Item, { through: 'Menu-Item '})

module.exports = {Restaurant, Item, Menu};