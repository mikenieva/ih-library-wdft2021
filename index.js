// 1. IMPORTACIONES
const express       = require('express')
const app           = express()      
const mongoose      = require("mongoose")

const Book          = require('./models/Book')


// 2. MIDDLEWARES
require('dotenv').config()

app.use(express.static('public'))
app.set("view engine", "hbs")

// 3. RUTAS
app.get("/", (req,res) => {
    res.render("index")
})


// 4. SERVIDOR


app.listen(process.env.PORT, () => {
    console.log("Servidor conectado")
})