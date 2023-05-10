const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token
let clienteId
const criaClienteRepetido = {
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
  })

  it('deve recusar a edição de um cliente por email e cpf já existente', async () => {

    const response = await testServer
      .put(`/cliente/${2}`)
      .set('Authorization', token)
      .send(criaClienteRepetido)

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
        .put(`/cliente/${1}`)
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
        .put(`/cliente/${1}`)
        .set('Authorization', token)
        .send(cliente)

      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toHaveProperty('nome')
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    }),

    it('deve editar um cliente com o mesmo email, que tenha o mesmo id', async () => {
      const cliente = {
        nome: 'joseEditado',
        email: 'jose@gmail.com',
        cpf: '12345668341',
      }

      const response = await testServer
        .put(`/cliente/${1}`)
        .set('Authorization', token)
        .send(cliente)

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT)
      expect(response.body).toEqual({})
    })
    
    it('deve editar um cliente', async () => {
      const cliente = {
        nome: 'joseEditado',
        email: 'joseE@gmail.com',
        cpf: '12345668341',
      }

      const response = await testServer
        .put(`/cliente/${1}`)
        .set('Authorization', token)
        .send(cliente)

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT)
      expect(response.body).toEqual({})
    })
})
