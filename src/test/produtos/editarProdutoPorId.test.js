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

describe('Editar produto', () => {
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

  it('deve recusar a edição de um produto por inexistência da categoria do id informado', async () => {
    const response = await testServer
      .put(`/produto/${produtoId}`)
      .set('Authorization', token)
      .send({
        ...criaProdutoPadrao,
        categoria_id: '9999',
      })

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch('categoria não encontrada')
  })

  it('deve recusar a edição de um produto por inexistência do produto do id informado', async () => {

    const response = await testServer
      .put(`/produto/9999`)
      .set('Authorization', token)
      .send(criaProdutoPadrao)

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch('produto não encontrado')
  })

  it('deve recusar a edição de um produto por falta de descricao', async () => {
    const { descricao: _, ...produto } = criaProdutoPadrao

    const response = await testServer
      .put(`/produto/${produtoId}`)
      .set('Authorization', token)
      .send(produto)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('descricao')
  })

  it('deve recusar a edição de um produto por falta de valor', async () => {
    const { valor: _, ...produto } = criaProdutoPadrao

    const response = await testServer
      .put(`/produto/${produtoId}`)
      .set('Authorization', token)
      .send(produto)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('valor')
  })

  it('deve recusar a edição de um produto por falta de id da categoria', async () => {
    const { categoria_id: _, ...produto } = criaProdutoPadrao

    const response = await testServer
      .put(`/produto/${produtoId}`)
      .set('Authorization', token)
      .send(produto)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('categoria_id')
  })

  it('deve recusar a edição de um produto por falta de quantidade de estoque', async () => {
    const { quantidade_estoque: _, ...produto } = criaProdutoPadrao

    const response = await testServer
      .put(`/produto/${produtoId}`)
      .set('Authorization', token)
      .send(produto)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('quantidade_estoque')
  })

  it('deve editar um produto', async () => {
    const produto = {
      descricao: 'Mouse',
      quantidade_estoque: '2',
      valor: '1000',
      categoria_id: '3',
    }

    const response = await testServer
      .put(`/produto/${produtoId}`)
      .set('Authorization', token)
      .send(produto)

    expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT)
    expect(response.body).toEqual({})
  })
})
