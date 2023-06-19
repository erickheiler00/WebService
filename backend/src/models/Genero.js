import mongoose from '../config/mongoose.js' 
import schema from '../schema/Genero.js'

// criando um modelo de dados do genero
const model = mongoose.model('Genero', schema) 

// definindo o objeto genero
const Genero = {
    
    // retorna todos os registros de generos no banco de dados
    list() {
        const query = {}
        return model.find(query)
    },

    // recebe o id do genero e
    // retorna o registro desse genero em especifico
    byId(id) {
        return model.findOne({_id: id})
    },

    // recebe os atributos do genero a ser salvo e
    // cria um novo registro de genero no banco de dados
    create(data) {
        const genero = new model(data)
        return genero.save()
    },

    // recebe o id do genero e os dados a serem atualizados
    // atualiza o registro do genero com base no id fornecido
    updateById(id, data) { 
        return model.updateOne({_id: id}, data) 
    },

    // recebe o id do genero
    // deleta/exclui do banco de dados o registro do genero que possui esse id   
    deleteById(id) {
        return model.deleteOne({_id: id})
    },
}

export default Genero