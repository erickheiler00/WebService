import mongoose from '../config/mongoose.js'
const {Schema} = mongoose

// a classe schema é usada para definir a estrutura do documento no mongodb

// modelo de dados da autor / definição da estrutura da autor 
const Autor = new Schema({ // nova instancia do Schema
    nome: String,
    pais: String
})

export default Autor