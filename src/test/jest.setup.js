const request = require('supertest')
const { app } = require('../server')
const knex = require('../config/conexao')

const testServer = request(app)

beforeAll(async () => {
  await knex('usuarios').del()
  await knex('clientes').del()
})

afterAll(async () => {
  await knex.destroy()
})

module.exports = { testServer }
