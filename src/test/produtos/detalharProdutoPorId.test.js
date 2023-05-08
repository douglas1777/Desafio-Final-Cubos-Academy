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

describe('Detalhar produto', () => {
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
    expect(response.statusCode).toEqual(StatusCodes.CREATED)
  })

  it('deve recusar o detalhamento de um produto por inexistência do produto do id informado', async () => {
    const response = await testServer
      .get(`/produto/9999`)
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch('produto não encontrado')
  })

  it('deve detalhar um produto', async () => {
    const response = await testServer
      .get(`/produto/${produtoId}`)
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toEqual(produtoId)
  })
})
