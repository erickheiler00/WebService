import {Router} from 'express'
import controller from '../controller/Editora.js'

const editoraRoutes = new Router() // nova instancia do Router

// definição das rotas do editoraRoutes
editoraRoutes.get('/', controller.list) // lista todos os registros
editoraRoutes.get('/:id', controller.byId) // lista um registro especifico
editoraRoutes.post('/', controller.create) // cadastra um novo registro
editoraRoutes.put('/:id', controller.updateById) // atualiza um registro existente
editoraRoutes.delete('/:id', controller.deleteById) // remove um registro especifico

// quando cada rota é acessada, a função controller.algumacoisa é chamada para lidar com a solicitacao

export default editoraRoutes