import {Router} from 'express'
import controller from '../controller/Livro.js'

const livroRoutes = new Router() // nova instancia do Router

// definição das rotas do livroRoutes
livroRoutes.get('/', controller.list) // lista todos os registros
livroRoutes.get('/:id', controller.byId) // lista um registro especifico
livroRoutes.post('/', controller.create) // cadastra um novo registro
livroRoutes.put('/:id', controller.updateById) // atualiza um registro existente
livroRoutes.delete('/:id', controller.deleteById) // remove um registro especifico

// quando cada rota é acessada, a função controller.algumacoisa é chamada para lidar com a solicitacao

export default livroRoutes