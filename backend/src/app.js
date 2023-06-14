import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
//import Home from './controller/Home.js'
import AppController from './controller/App.js'

// configuração do express

// importando modulo express
//const express = require('express')
const app = express()

// CORS
// adicionar cabeçalho de liberação de origem
// const cors = require('cors')
// permite que o servidor responda a requisições de diferentes origens 

// avisar quais tipos de body a aplicação aceita:
app.use(express.json()); // adiciona o middleware express.json()
// urlencoded: analisa os dados enviados em um formato de formulário HTML a partir de uma solicitação HTTP
app.use(express.urlencoded({extended: true})) // garante que o middleware urlencoded seja aplicado a todas as rotas, por exemplo POST

app.use(cors()) // adiciona o middleware cors()

app.use(routes) // adciciona o middleware routes

//app.get('/', Home.index)

// adiciona os middlewares notFound e gerenciaErro do AppController
app.use(AppController.notFound) 
app.use(AppController.gerenciaErro)

export default app // permite que outros arquivos importem o objeto app

/*
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000: http://localhost:3000/');
});
*/

// URL do servidor (segurar o CTRL e clicar em cima):
// http://localhost:3000/

// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

// para inicializar:
// npm run dev