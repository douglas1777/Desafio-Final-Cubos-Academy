const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token

const criaProdutoPadrao = {
  descricao: 'Teclado_editado',
  quantidade_estoque: '4',
  valor: '3000',
  categoria_id: '1',
  produto_imagem:
    'https://sdioilofaevysatctgzg.supabase.co/storage/v1/object/public/imagem/teste/75f534c9-d6a8-4c76-814b-ee8c2d08ca88',
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
  })

  it('deve recusar a edição de um produto por inexistência da categoria do id informado', async () => {
    const response = await testServer
      .put(`/produto/${3}`)
      .set('Authorization', token)
      .send({
        ...criaProdutoPadrao,
        categoria_id: '9999',
      })

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch('Categoria não encontrada')
  })

  it('deve recusar a edição de um produto por inexistência da imagem no servidor', async () => {
    const response = await testServer
      .post('/produto')
      .set('Authorization', token)
      .send({
        descricao: 'Teclado',
        quantidade_estoque: '4',
        valor: '3000',
        categoria_id: '1',
        produto_imagem: 'imagem_inexistente',
      })

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch('A imagem não foi encontrada')
  })

  it('deve recusar a edição de um produto por inexistência do produto do id informado', async () => {
    const response = await testServer
      .put(`/produto/9999`)
      .set('Authorization', token)
      .send(criaProdutoPadrao)

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch('Produto não encontrado')
  })

  it('deve recusar a edição de um produto por falta de descricao', async () => {
    const { descricao: _, ...produto } = criaProdutoPadrao

    const response = await testServer
      .put(`/produto/${3}`)
      .set('Authorization', token)
      .send(produto)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('descricao')
  })

  it('deve recusar a edição de um produto por falta de valor', async () => {
    const { valor: _, ...produto } = criaProdutoPadrao

    const response = await testServer
      .put(`/produto/${3}`)
      .set('Authorization', token)
      .send(produto)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('valor')
  })

  it('deve recusar a edição de um produto por falta de id da categoria', async () => {
    const { categoria_id: _, ...produto } = criaProdutoPadrao

    const response = await testServer
      .put(`/produto/${3}`)
      .set('Authorization', token)
      .send(produto)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('categoria_id')
  })

  it('deve recusar a edição de um produto por falta de quantidade de estoque', async () => {
    const { quantidade_estoque: _, ...produto } = criaProdutoPadrao

    const response = await testServer
      .put(`/produto/${3}`)
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
      .put(`/produto/${3}`)
      .set('Authorization', token)
      .send(produto)

    expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT)
    expect(response.body).toEqual({})
  })
})
