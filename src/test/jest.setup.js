const request = require('supertest')
const { app } = require('../server')
const knex = require('../database/config')

const testServer = request(app)

beforeAll(async () => {
  await knex.migrate.latest()
  await knex.seed.run()
})

afterAll(async () => {
  await knex.destroy()
})

module.exports = { testServer }
