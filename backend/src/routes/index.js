import {Router} from 'express' // importa a classe Router do express
import generoRoutes from './genero.js'
import editoraRoutes from './editora.js'
import autorRoutes from './autor.js'
import livroRoutes from './livro.js'
import createError from 'http-errors'
import jwt from 'jwt-simple'
import moment from 'moment'
import config from 'config'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../swagger_output.json' assert { type: "json" }

// Router é usado para definir as rotas

// definições das rotas

const routes = new Router() // nova instância do Router

// rota padrao
routes.get('/', (req, res) => {
    res.send('Hello World')
})

// rota para login
// verifica o usuario e senha enviados no corpo da requisicao POST e retorna um token
routes.post('/login', (req, res, next) => {
    const {username, password} = req.body

    if (username === 'usuario1' && password === '123'){
        const token = jwt.encode({
            user: username,
            exp: moment().add(7, 'days').valueOf()
        }, config.get('jwtTokenSecret'))
        return res.json({token})
    }
    next(createError(401, 'Unauthorized'))
})

const verifyJwt = (req, res, next) => {
    // se o token nao for informado sera retornado um erro 401
    const authToken = req.headers.authorization || ""
    const [, token] = authToken.split(' ');
    if (!token) {
        return next(createError(401, 'Unauthorized'))
    }

    // ira tentar decodificar o token com jwt.encode, passando o secret do config
    try {
        const decoded = jwt.decode(token, config.get('jwtTokenSecret'))
        const isExpired = moment(decoded.exp).isBefore(new Date())
        // caso seja expirado, invoca o next com um objeto erro
        if(isExpired) {
            next(createError(401, 'Unauthorized'))
        // se estiver tudo certo o usuario lido do token sera colocado no objeto request
        } else {
            req.user = decoded.user
            next() // para utilizar os dados do usuario do token nos proximos middlewares
    }

    // se nao for possivel decodificar sera retornado um erro
    } catch(err) {
        err.status = 401
        console.log(err)
        return next(err)
    }
}

// todas as rotas definidas no objeto generoRoutes serão roteadas
// a partir do caminho /genero
routes.use('/genero', verifyJwt, generoRoutes)

// todas as rotas definidas no objeto editoraRoutes serão roteadas
// a partir do caminho /editora
routes.use('/editora', verifyJwt, editoraRoutes)

// todas as rotas definidas no objeto autorRoutes serão roteadas
// a partir do caminho /autor
routes.use('/autor', verifyJwt, autorRoutes)

// todas as rotas definidas no objeto livroRoutes serão roteadas
// a partir do caminho /livro
routes.use('/livro', verifyJwt, livroRoutes)

// Rota para a documentação Swagger
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerFile));

export default routes