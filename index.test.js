const request = require("supertest")
const { app } = require('./src/app')
const { Restaurant } = require('./models/Restaurant')
const {syncSeed} = require('./seed.js')


let resLen
beforeAll(async()=>{
    await syncSeed()
    const restaurants = await Restaurant.findAll({})
    resLen = restaurants.length
})

describe('Testing Endpoints', () =>{
    test('GET /restaurants 200 statusCode', async() =>{
        const res = await request(app).get("/restaurants");
        expect(res.statusCode).toEqual(200);
    })

    test('GET /restaurants return all ', async()=>{
        const res = await request(app).get('/restaurants')
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body[0]).toHaveProperty('cuisine')
        expect(res.body.length).toEqual(resLen)
    })

    test('GET /restaurants return correct data ', async()=>{
        const res = await request(app).get('/restaurants')
        expect(res.body).toContainEqual(
            expect.objectContaining({
                id:1,
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        )
    })

    test('GET /restaurants/:id return correct data ', async()=>{
        const res = await request(app).get('/restaurants/1')
        expect(res.body).toEqual(
            expect.objectContaining({
                id:1,
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        )
    })

    test('POST /restaurant endpoint', async() => { 
        const res = (await request(app)
            .post('/restaurants')
            .send(
            {
                name: 'test',
                location: 'Bacau',
                cuisine: 'Romanian'
            }
        ))
        const restaurants = await Restaurant.findAll({})
        expect(restaurants.length).toEqual(resLen + 1)
    })

    test('PUT /restaurants/:id endpoint', async() => { 
        await request(app)
            .put('/restaurants/1')
            .send(
            {
                name: 'test',
                location: 'Bacau',
                cuisine: 'Romanian'
            }
        )
        const restaurant = await Restaurant.findByPk(1)
        expect(restaurant.name).toEqual('test')
    })

    test('DELETE /restaurants/:id endpoint', async() =>{
        await request(app).delete('/restaurants/1')
        const restaurants = await Restaurant.findAll({})
        expect(restaurants.length).toEqual(resLen);
        expect(restaurants[1].id).not.toEqual(1)
    })

  })