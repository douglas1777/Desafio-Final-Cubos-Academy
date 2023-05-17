require('dotenv').config()
require('express-async-errors')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const { rotas } = require('./rotas')

const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use(rotas)



module.exports = { app }
