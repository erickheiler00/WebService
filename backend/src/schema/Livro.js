import mongoose from '../config/mongoose.js'
const {Schema} = mongoose

// a classe schema é usada para definir a estrutura do documento no mongodb

// modelo de dados do livro / definição da estrutura do livro 
const Livro = new Schema({ // nova instancia do Schema
    titulo: String,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor'
    },
    editora: {
        type: Schema.Types.ObjectId,
        ref: 'Editora'
    },
    ano: Number,
    edicao: Number,
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero'
    }
})

export default Livro