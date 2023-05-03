const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token
let clienteId
const criaClientePadrao = {
  nome: 'José',
  email: 'jose@email.com',
  cpf: '12345668804',
}

describe('Editar cliente', () => {
  beforeAll(async () => {
    const { body } = await testServer
      .post('/usuario')
      .send({ nome: 'bruno', email: 'bruno@email.com', senha: '123' })

    const logarUsuario = await testServer
      .post('/login')
      .send({ email: body.email, senha: '123' })

    token = 'bearer ' + logarUsuario.body.token

    const response = await testServer
      .post(`/cliente`)
      .set('Authorization', token)
      .send(criaClientePadrao)

    clienteId = response.body.id
    expect(response.statusCode).toEqual(StatusCodes.CREATED)
  })

  it('deve recusar a edição de um cliente por email e cpf já existente', async () => {
    const { body } = await testServer
      .post(`/cliente`)
      .set('Authorization', token)
      .send({
        nome: 'jose',
        email: 'joseeditado@gmail.com',
        cpf: '12345668811',
      })

    const response = await testServer
      .put(`/cliente/${body.id}`)
      .set('Authorization', token)
      .send(criaClientePadrao)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch(
      'Já existe cliente cadastrado com o cpf e email informado'
    )
  }),
    it('deve recusar a edição de um cliente por falta de email e cpf', async () => {
      const cliente = {
        nome: 'jose',
      }

      const response = await testServer
        .put(`/cliente/${clienteId}`)
        .set('Authorization', token)
        .send(cliente)

      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toHaveProperty('cpf')
      expect(response.body.mensagem).toHaveProperty('email')
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    }),
    it('deve recusar a edição de um cliente por falta de nome', async () => {
      const cliente = {
        email: 'jose@gmail.com',
        cpf: '12345668804',
      }

      const response = await testServer
        .put(`/cliente/${clienteId}`)
        .set('Authorization', token)
        .send(cliente)

      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toHaveProperty('nome')
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    }),
    it('deve editar um cliente', async () => {
      const cliente = {
        nome: 'joseEditado',
        email: 'joseE@gmail.com',
        cpf: '12345668341',
      }

      const response = await testServer
        .put(`/cliente/${clienteId}`)
        .set('Authorization', token)
        .send(cliente)

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT)
      expect(response.body).toEqual({})
    })
})
