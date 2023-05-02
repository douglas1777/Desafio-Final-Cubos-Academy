const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token
const criaClientePadrao = {
  nome: 'José',
  email: 'jose@email.com',
  cpf: '12345668804',
}

describe('Criar cliente', () => {
  beforeAll(async () => {
    const { body } = await testServer
      .post('/usuario')
      .send({ nome: 'bruno', email: 'bruno@email.com', senha: '123' })

    const logarUsuario = await testServer
      .post('/login')
      .send({ email: body.email, senha: '123' })

    token = 'bearer ' + logarUsuario.body.token

    const { id } = await testServer.post('/cliente').set('Authorization', token).send(criaClientePadrao)

    clienteId = id
    expect(logarUsuario.statusCode).toEqual(StatusCodes.OK)
  })

  it('deve recusar a criação de um cliente por falta de email e cpf', async () => {
    const cliente = {
      nome: 'jose',
    }

    const response = await testServer
      .post('/cliente')
      .set('Authorization', token)
      .send(cliente)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('cpf')
    expect(response.body.mensagem).toHaveProperty('email')
  }),
    it('deve recusar a criação de um cliente por falta de nome', async () => {
      const cliente = {
        email: 'jose@gmail.com',
        cpf: '12345668804',
      }

      const response = await testServer
        .post('/cliente')
        .set('Authorization', token)
        .send(cliente)

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toHaveProperty('nome')
    }),
    it('deve recusar a criação de um cliente por email repetido', async () => {
      const response = await testServer
        .post('/cliente')
        .set('Authorization', token)
        .send(criaClientePadrao)

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toMatch(
        'Já existe cliente cadastrado com o e-mail ou CPF informado'
      )
      // todo email infomado
    }),

    it('deve recusar a criação de um cliente por tipo de email incorreto', async () => {
      const response = await testServer
        .post('/cliente')
        .set('Authorization', token)
        .send({ ...criaClientePadrao, email: 'email' })

      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toHaveProperty('email')
      expect(response.body.mensagem.email).toMatch(
        'email deve ser um email válido'
      )
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    }),
    it('deve criar um cliente', async () => {
      const cliente = {
        nome: 'jose',
        email: 'jose2@gmail.com',
        cpf: '32345668803',
      }

      const response = await testServer
        .post('/cliente')
        .set('Authorization', token)
        .send(cliente)

      expect(response.body).toHaveProperty('id')
      expect(response.statusCode).toEqual(StatusCodes.CREATED)
    })
})
