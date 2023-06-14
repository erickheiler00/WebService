import mongoose from '../config/mongoose.js' 
import schema from '../schema/Livro.js'

// criando um modelo de dados do livro
const model = mongoose.model('Livro', schema) 

// definindo o objeto Livro
const Livro = {
    
    // retorna todos os registros de livros no banco de dados
    list() {
        const query = {}
        return model.find(query)
    },

    // recebe o id do livro e
    // retorna o registro desse livro em especifico
    byId(id) {
        return model.findOne({_id: id})
    },

    // recebe os atributos do livro a ser salvo e
    // cria um novo registro de livro no banco de dados
    create(data) {
        const livro = new model(data)
        return livro.save()
    },

    // recebe o id do livro e os dados a serem atualizados
    // atualiza o registro do livro com base no id fornecido
    updateById(id, data) { 
        return model.updateOne({_id: id}, data) 
    },

    // recebe o id do livro
    // deleta/exclui do banco de dados o registro do livro que possui esse id   
    deleteById(id) {
        return model.deleteOne({_id: id})
    },
}

// criando um novo registro de livro
/*
const data = {
    "autor" : "desconhecido",
    "editora" : "desconhecida",
    "ano" : 2000,
    "edicao" : 1,
    "genero" : "Conto"
}
Livro.create(data)
*/

export default Livro