const request = require('supertest')
const { app } = require('../server')
const knex = require('../database/config/conexao')

const testServer = request(app)

beforeAll(async () => {
  await knex('usuarios').del()
  await knex('clientes').del()
  await knex('produtos').del()
})

afterAll(async () => {
  await knex.destroy()
})

module.exports = { testServer }
