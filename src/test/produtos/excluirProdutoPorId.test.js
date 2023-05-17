const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token

describe('Excluir produto', () => {
  beforeAll(async () => {
    const { body } = await testServer
      .post('/usuario')
      .send({ nome: 'bruno', email: 'bruno@email.com', senha: '123' })

    const logarUsuario = await testServer
      .post('/login')
      .send({ email: body.email, senha: '123' })

    token = 'bearer ' + logarUsuario.body.token
  })

  it('deve recusar a exclusão de um produto por razão do produto estar presente em um pedido', async () => {
    const response = await testServer
      .del(`/produto/${3}`)
      .set('Authorization', token)
      .send()

    // expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch(
      'O produto não pode ser excluído pois está presente em um pedido'
    )
  })


  it('deve excluir um produto', async () => {
    
    const response = await testServer
      .del(`/produto/${13}`)
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT)
    expect(response.body).toEqual({})
  })
})
