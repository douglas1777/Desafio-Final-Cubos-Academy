const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token

describe('Detalhar usuário', () => {
  beforeAll(async () => {
    const logarUsuario = await testServer
      .post('/login')
      .send({ email: 'bruno@gmail.com', senha: '123' })
    token = 'bearer ' + logarUsuario.body.token

    expect(logarUsuario.statusCode).toEqual(StatusCodes.OK)
  })

  it('deve detalhar um usuário', async () => {
    const response = await testServer
      .get('/usuario')
      .set('Authorization', token)
      .send()
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body).toHaveProperty('nome')
    expect(response.body).toHaveProperty('email')
  })
})
