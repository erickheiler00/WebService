import {Router} from 'express'
import controller from '../controller/Genero.js'

const generoRoutes = new Router() // nova instancia do Router

// definição das rotas do generoRoutes
generoRoutes.get('/', controller.list) // lista todos os registros
generoRoutes.get('/:id', controller.byId) // lista um registro especifico
generoRoutes.post('/', controller.create) // cadastra um novo registro
generoRoutes.put('/:id', controller.updateById) // atualiza um registro existente
generoRoutes.delete('/:id', controller.deleteById) // remove um registro especifico

// quando cada rota é acessada, a função controller.algumacoisa é chamada para lidar com a solicitacao

export default generoRoutes