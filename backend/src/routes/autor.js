import {Router} from 'express'
import controller from '../controller/Autor.js'

const autorRoutes = new Router() // nova instancia do Router

// definição das rotas do autorRoutes
autorRoutes.get('/', controller.list) // lista todos os registros
autorRoutes.get('/:id', controller.byId) // lista um registro especifico
autorRoutes.post('/', controller.create) // cadastra um novo registro
autorRoutes.put('/:id', controller.updateById) // atualiza um registro existente
autorRoutes.delete('/:id', controller.deleteById) // remove um registro especifico

// quando cada rota é acessada, a função controller.algumacoisa é chamada para lidar com a solicitacao

export default autorRoutes