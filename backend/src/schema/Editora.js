import mongoose from '../config/mongoose.js'
const {Schema} = mongoose

// a classe schema é usada para definir a estrutura do documento no mongodb

// modelo de dados da editora / definição da estrutura da editora 
const Editora = new Schema({ // nova instancia do Schema
    nome: String
})

export default Editora