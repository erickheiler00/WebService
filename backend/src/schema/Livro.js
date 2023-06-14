import mongoose from '../config/mongoose.js'
const {Schema} = mongoose

// a classe schema é usada para definir a estrutura do documento no mongodb

// modelo de dados do livro / definição da estrutura do livro 
const Livro = new Schema({ // nova instancia do Schema
    titulo: String,
    autor: String,
    editora: String,
    ano: Number,
    edicao: Number,
    genero: {
        type: String, // lista de valores permitidos para o gênero
        enum: ['Fantasia', 'Ficção científica', 'Terror', 'Romance', 'Conto', 'Infantil', 'Biografia', 'Humor', 'Autoajuda', 'História']
    }
})

export default Livro