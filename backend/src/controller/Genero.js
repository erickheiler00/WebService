import models from '../models/Genero.js'
import createError from 'http-errors' // para erros personalizados

// retornar não encontrado caso seja solicitado um ID que não existe
const gerenciaNotFound = (result) => {
    if (!result) {
        throw createError(404, 'registro não encontrado')
    }
    return result
}

// CRUD
const Genero = {
    // list é chamada quando a rota para listar todos os generos é acessada
    list(req, res, next) {
        models.list() // obtem todos os registros dos generos no banco de dados
            .then(result => res.json(result)) // envia a resposta em formato JSON
            .catch(next) // se ocorrer um erro o next é chamado 
    },

    // chamada quando a rota para obter um genero específico por ID é acessada
    byId(req, res, next) {
        models.byId(req.params.id) // obter o valor do parametro id passado na URL
            .then(gerenciaNotFound) // gerenciaNotFound é aplicada ao resultado obtido
                                    // verifica se o genero existe ou não
            .then(result => res.json(result))
            .catch(next)   
    },

    // chamada quando a rota para criar um novo genero é acessada
    create(req, res, next) {
        models.create(req.body) // cria um novo registro
            .then(result => res.status(201).json(result)) // envia a resposta com status de OK
            .catch(next)
    },

    // chamada quando a rota para atualizar um genero por ID é acessada
    updateById(req, res, next) {
        models.updateById(req.params.id, req.body) // atualiza o genero com base no ID fornecido
                                                   // e nos dados fornecidos no corpo da requisição
            .then(result => res.json(result))
            .catch(next)
    },

    // chamada quando a rota para excluir um genero por ID é acessada
    deleteById(req, res, next) {
        models.deleteById(req.params.id) // exclui o registro do genero com base no ID fornecido
            .then(_ => res.sendStatus(204)) // status de OK quando é delete
            .catch(next)
    }
}

export default Genero