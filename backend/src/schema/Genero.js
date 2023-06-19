import mongoose from '../config/mongoose.js'
const {Schema} = mongoose

// a classe schema é usada para definir a estrutura do documento no mongodb

// modelo de dados do genero / definição da estrutura do genero 
const Genero = new Schema({ // nova instancia do Schema
    nome: String
})

export default Genero