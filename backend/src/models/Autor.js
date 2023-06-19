import mongoose from '../config/mongoose.js' 
import schema from '../schema/Autor.js'

// criando um modelo de dados do autor
const model = mongoose.model('Autor', schema) 

// definindo o objeto autor
const Autor = {
    
    // retorna todos os registros de autores no banco de dados
    list() {
        const query = {}
        return model.find(query)
    },

    // recebe o id do autor e
    // retorna o registro desse autor em especifico
    byId(id) {
        return model.findOne({_id: id})
    },

    // recebe os atributos do autor a ser salvo e
    // cria um novo registro de autor no banco de dados
    create(data) {
        const autor = new model(data)
        return autor.save()
    },

    // recebe o id do autor e os dados a serem atualizados
    // atualiza o registro do autor com base no id fornecido
    updateById(id, data) { 
        return model.updateOne({_id: id}, data) 
    },

    // recebe o id do autor
    // deleta/exclui do banco de dados o registro do autor que possui esse id   
    deleteById(id) {
        return model.deleteOne({_id: id})
    },
}

export default Autor