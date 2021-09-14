const clientCas = require("./src/config/db")
const express = require("express")
const consign = require("consign")
const morgan = require("morgan")
const path = require("path")
require("dotenv").config()


const app = express()

clientCas.connect(function(err) {
    if (err) console.log(err)
    else console.log("Connect cassandra db 🚥 ")
})

app.db = clientCas

app.use(morgan("dev"))

app.use(
    "/images",
    express.static(path.resolve(__dirname, "tmp", "midia"))
)

consign()
    .then("./src/config/middlewares.js")
    .then("./src/utils/validationUser.js")
    .then("./src/api")
    .then("./src/routes/routerUser.js")
    .into(app)

app.listen(process.env.PORT, () => {
    console.log(`Backend executando na porta ${process.env.PORT} 🚀 ` )
})