const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let produtoId
let token

const criaProdutoPadrao = {
  descricao: 'Teclado',
  quantidade_estoque: '4',
  valor: '3000',
  categoria_id: '1',
}

describe('Listar produto', () => {
  beforeAll(async () => {
    const { body } = await testServer
      .post('/usuario')
      .send({ nome: 'bruno', email: 'bruno@email.com', senha: '123' })

    const logarUsuario = await testServer
      .post('/login')
      .send({ email: body.email, senha: '123' })

    token = 'bearer ' + logarUsuario.body.token

    const response = await testServer
      .post('/produto')
      .set('Authorization', token)
      .send(criaProdutoPadrao)

    produtoId = response.body.id
    expect(logarUsuario.statusCode).toEqual(StatusCodes.OK)
  })

  it('deve listar todos os produtos', async () => {
    const response = await testServer
      .get('/produto')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body).toBeTruthy()
  })
})
