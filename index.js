// 1. IMPORTACIONES
const express       = require('express')
const app           = express()      
const mongoose      = require("mongoose")
const bodyParser    = require("body-parser")

const Book          = require('./models/Book')

// 2. MIDDLEWARES
require('dotenv').config()

mongoose.connect(process.env.MONGODB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {console.log("Conectados a MongoDB")})
    .catch((e) => console.log(e))


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set("view engine", "hbs")

// 3. RUTAS
app.get("/", (req,res) => {
    res.render("index")
})

app.get("/books", (req, res) => {
    
    Book.find({})
        .then((librosEncontrados) => {
            console.log(librosEncontrados) // [{...},{...},{...}] 

            res.render("books", {
                libros: librosEncontrados
            })
        })
        .catch((e) => {
            console.log(e)
        })


})


app.get("/books/create", (req, res) => {
    res.render("book-create")
})

app.post("/books/create", (req, res) => {

    const { title, author, description, rating } = req.body

    Book.create({title, author, description, rating})
        .then((libroCreado) => {
            res.redirect("/books")
        })
        .catch(e => console.log(e))


})


// QUERY PARAMS
app.get("/books/:bookId", (req, res) => {
    console.log("Este es el req.params:", req.params)
    const { bookId } = req.params

    Book.findById(bookId)
        .then(singleBook => {
            console.log(`Libro encontrado:`, singleBook)

            res.render("singleBook", {
                libro: singleBook
            })        
        })
        .catch(e => console.log(e))
})

// QUERY STRINGS
app.get("/search", (req, res) => {

    const queries = req.query
    
    res.render("search", {
        busqueda: queries
    })
})


app.post("/search", (req, res) => {
    const valorFormulario = req.body
    
    res.redirect(`/search?palabra=${valorFormulario.palabra}`)    

})



app.get('/books/:bookId/edit', (req, res) => {
    console.log(req)
    const { bookId } = req.params

    Book.findById(bookId)
        .then(libroEncontrado => {
            console.log(libroEncontrado)

            res.render("book-edit", {
                libro: libroEncontrado
            })

        })
        .catch((e) => {console.log(e)})
})


app.post("/books/:bookId/edit", (req, res) => {

    // PARÁMETROS DE LA URL (bookId)
    const { bookId } = req.params
    // DATOS DEL FORMULARIO
    const { title, description, author, rating } = req.body

    Book.findByIdAndUpdate(bookId, {title, description, author, rating}, {new: true})
        .then(libroActualizado => {
            console.log(libroActualizado)
            res.redirect(`/books/${libroActualizado.id}`)
        })
        .catch(e => console.log(e))    
})


app.post("/books/:bookId/delete", (req, res) => {
    const { bookId } = req.params


    Book.findByIdAndDelete(bookId)
        .then(() => {
            res.redirect("/books")
        })
        .catch(e => console.log(e))

})









// 4. SERVIDOR
app.listen(process.env.PORT, () => {
    console.log("Servidor conectado")
})