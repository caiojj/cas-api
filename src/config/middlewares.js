const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")

// Um middleware estente o comportamento da aplicação
module.exports = app => {
    app.use(express.json())
    app.use(express.urlencoded( { extended: true } ))
    app.use(cors())
}