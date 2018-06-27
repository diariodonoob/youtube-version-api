const express = require('express')
const bodyParser = require('body-parser')

const routesVersioning = require('express-routes-versioning')();

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const responseNotFoundVersion = (req, res, next) => {
    res.status(200).json({title: 'Error', message: 'Não versionamento'})
}

const responseV1Controller = (req, res, next) => {
    res.status(200).json({title: 'Versão 1.0.0', message: 'Estou na versão 1.0.0'})
}

const responseV2Controller = (req, res, next) => {
    res.status(200).json({title: 'Versão 2.0.0', message: 'Estou na versão 2.0.0'})
}

app.get('/test', routesVersioning({
    "1.0.0": responseV1Controller,
    "~2.2.1": responseV2Controller
 }, responseNotFoundVersion));
const port = process.env.PORT || 8080

app.listen(port)