// 1. IMPORTACIONES
const mongoose      = require("mongoose")
const Schema        = mongoose.Schema

// 2. SCHEMA

const bookSchema = new Schema(
    {
        title: String,
        description: String,
        author: String,
        rating: Number
    },
    {
        timestamps: true // Generar el momento en el que se creó el documento
    }
)


// 3. MODELO

const Book = mongoose.model("Book", bookSchema)


// 4. EXPORTACIÓN
module.exports = Book

