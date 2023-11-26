const db = require("./db/connection")
const app = require("./src/app.js");
const port = 3000;

app.listen(port, () => {
    db.sync();
    console.log(`Listening at http://localhost:${port}/restaurants`);
})
