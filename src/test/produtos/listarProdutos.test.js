const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token

describe('Listar produto', () => {
  beforeAll(async () => {
    const { body } = await testServer
      .post('/usuario')
      .send({ nome: 'bruno', email: 'bruno@email.com', senha: '123' })

    const logarUsuario = await testServer
      .post('/login')
      .send({ email: body.email, senha: '123' })

    token = 'bearer ' + logarUsuario.body.token
  })

  it('não deve listar os produtos, devido a não existir a categoria enviada', async () => {
    const response = await testServer
      .get('/produto?categoria_id=9999')
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch('Categoria não encontrada')
  })

  it('deve listar somente os produtos com uma categoria enviada', async () => {
    const response = await testServer
      .get(`/produto?categoria_id=${1}`)
      .set('Authorization', token)
      .send()

    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body).toBeTruthy()
  })

  it('deve listar somente os produtos com duas categorias enviadas', async () => {
    const response = await testServer
      .get(`/produto?categoria_id=${1}&categoria_id=${2}`)
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
