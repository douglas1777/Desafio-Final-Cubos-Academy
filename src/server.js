require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const { rotas } = require('./rotas')

const app = express()

app.use(cors())
app.use(express.json())
app.use(rotas)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = { app }
