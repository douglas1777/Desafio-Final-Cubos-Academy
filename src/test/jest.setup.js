const request = require('supertest')
const { app } = require('../server')

const server = request(app)

module.exports = { server }
