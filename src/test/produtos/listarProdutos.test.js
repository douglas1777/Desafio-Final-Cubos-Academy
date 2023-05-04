const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let produtoId
let token
let categoriaId

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
    categoriaId = response.body.categoria_id
    expect(logarUsuario.statusCode).toEqual(StatusCodes.OK)
  })

  it('não deve listar os produtos, devido a não existir a categoria enviada', async () => {
    const response = await testServer
      .get('/produto?filtro[]=9999')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch('categoria não encontrada')
  })

  it('deve listar somente os produtos com uma categoria enviada', async () => {
    const response = await testServer
      .get(`/produto?filtro[]=${categoriaId}`)
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body).toBeTruthy()
  })

  it('deve listar somente os produtos com duas categorias enviadas', async () => {
    const { body } = await testServer
      .post(`/produto`)
      .set('Authorization', token)
      .send({ ...criaProdutoPadrao, categoria_id: '4' })

    const response = await testServer
      .get(`/produto?filtro[]=${categoriaId}&filtro[]=${body.categoria_id}`)
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body).toBeTruthy()
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
