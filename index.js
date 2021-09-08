const app = require("express")()
const env = require("dotenv").config(".env")
const consign = require("consign")
const clientCas = require("./src/config/db")

clientCas.connect(function(err) {
    if (err) console.log()
    else console.log("Connect cassandra db")
})

app.db = clientCas

consign()
    .then("./src/config/middlewares.js")
    .into(app)

app.listen(env.PORT, () => {
    console.log("Backend executando...")
})