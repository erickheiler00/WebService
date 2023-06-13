import express from "express";
import path from 'path'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import reactViews from 'express-react-views'

// criando uma instancia do express
const app = express()

// armazenando o caminho absoluto do diretorio do arquivo atual
const __dirname = path.join(dirname(fileURLToPath(import.meta.url)), '../');

// configurando a view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jsx')
app.engine('jsx', reactViews.createEngine())

// rota padrao
app.get('/', (req, res) => {
    //res.send('Hello World')
    res.render('index', { title: 'Livros API', message: 'teste' })
})

// rota loop
app.get('/loop', (req, res) => {
    const livros = [
        { autor: 'desconhecido', editora: 'desconhecida', ano: 1990, edicao: 1, genero: 'Fantasia' }
    ]
    res.render('loop', {tittle: 'Loop page', livros})
})

// configurando o express para servir arquivos estaticos do diretorio public
app.use(express.static(path.join(__dirname, 'public')))

export default app