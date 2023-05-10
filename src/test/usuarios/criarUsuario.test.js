const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

describe('Criar usuário', () => {
  it('deve recusar a criação de um usuário por falta de email e senha', async () => {
    const usuario = {
      nome: 'bruno',
    }

    const response = await testServer.post('/usuario').send(usuario)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('senha')
    expect(response.body.mensagem).toHaveProperty('email')
  }),
    it('deve recusar a criação de um usuário por falta de nome', async () => {
      const usuario = {
        email: 'bruno@gmail.com',
        senha: '123',
      }

      const response = await testServer.post('/usuario').send(usuario)

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toHaveProperty('nome')
    }),
    it('deve recusar a criação de um usuário por email repetido', async () => {
      const criaUsuarioPadrao = {
        nome: 'bruno',
        email: 'bruno@gmail.com',
        senha: '123',
      }
      const response = await testServer.post('/usuario').send(criaUsuarioPadrao)

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toMatch(
        'Já existe usuário cadastrado com o e-mail informado'
      )
    }),
    it('deve recusar a criação de um usuário por tipo de email incorreto', async () => {
      const response = await testServer
        .post('/usuario')
        .send({ nome: 'teste', email: 'email', senha: 'senha' })

      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toHaveProperty('email')
      expect(response.body.mensagem.email).toMatch(
        'email deve ser um email válido'
      )
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    }),
    it('deve criar um usuário', async () => {
      const usuario = {
        nome: 'bruno',
        email: 'bruno2@gmail.com',
        senha: '123',
      }

      const response = await testServer.post('/usuario').send(usuario)

      expect(response.body).toHaveProperty('id')
      expect(response.statusCode).toEqual(StatusCodes.CREATED)
    })
})
