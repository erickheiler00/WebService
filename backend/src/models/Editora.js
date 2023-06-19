import mongoose from '../config/mongoose.js' 
import schema from '../schema/Editora.js'

// criando um modelo de dados do editora
const model = mongoose.model('Editora', schema) 

// definindo o objeto editora
const Editora = {
    
    // retorna todos os registros de editoras no banco de dados
    list() {
        const query = {}
        return model.find(query)
    },

    // recebe o id do editora e
    // retorna o registro desse editora em especifico
    byId(id) {
        return model.findOne({_id: id})
    },

    // recebe os atributos do editora a ser salvo e
    // cria um novo registro de editora no banco de dados
    create(data) {
        const editora = new model(data)
        return editora.save()
    },

    // recebe o id do editora e os dados a serem atualizados
    // atualiza o registro do editora com base no id fornecido
    updateById(id, data) { 
        return model.updateOne({_id: id}, data) 
    },

    // recebe o id do editora
    // deleta/exclui do banco de dados o registro do editora que possui esse id   
    deleteById(id) {
        return model.deleteOne({_id: id})
    },
}

export default Editora