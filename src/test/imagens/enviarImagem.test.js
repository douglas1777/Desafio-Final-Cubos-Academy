const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token

describe('Enviar imagens', () => {
  beforeAll(async () => {
    const { body } = await testServer
      .post('/usuario')
      .send({ nome: 'bruno', email: 'bruno@email.com', senha: '123' })

    const logarUsuario = await testServer
      .post('/login')
      .send({ email: body.email, senha: '123' })

    token = 'bearer ' + logarUsuario.body.token
  })

  it('deve retornar erro por falta de imagem no body', async () => {
    const response = await testServer
      .post('/arquivo/upload')
      .set('Authorization', token)
      .send()
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toEqual(
      'É obrigatório fornecer a imagem em formato multipart form'
    )
  })
})
