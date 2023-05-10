const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token

describe('Editar usuário', () => {
  beforeAll(async () => {

    const logarUsuario = await testServer
      .post('/login')
      .send({ email: 'bruno@gmail.com', senha: '123' })
    token = 'bearer ' + logarUsuario.body.token

    expect(logarUsuario.statusCode).toEqual(StatusCodes.OK)
  })

  it('deve recusar a edição de um usuário por outro email já existente', async () => {
    const usuarioEmailRepetido = {
      nome: 'bruno',
      email: 'jose@gmail.com',
      senha: '123',
    }

    const response = await testServer
      .put('/usuario')
      .set('Authorization', token)
      .send(usuarioEmailRepetido)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch(
      'Já existe usuário cadastrado com o e-mail informado'
    )
  }),
    it('deve recusar a edição de um usuário por falta de email e senha', async () => {
      const usuario = {
        nome: 'bruno',
      }

      const response = await testServer
        .put('/usuario')
        .set('Authorization', token)
        .send(usuario)

      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toHaveProperty('senha')
      expect(response.body.mensagem).toHaveProperty('email')
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    }),
    it('deve recusar a edição de um usuário por falta de nome', async () => {
      const usuario = {
        email: 'bruno@gmail.com',
        senha: '123',
      }

      const response = await testServer
        .put('/usuario')
        .set('Authorization', token)
        .send(usuario)

      expect(response.body).toHaveProperty('mensagem')
      expect(response.body.mensagem).toHaveProperty('nome')
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    }),
    it('deve editar um usuário', async () => {
      const usuario = {
        nome: 'brunoEditado',
        email: 'bruno@gmail.com',
        senha: '123',
      }

      const response = await testServer
        .put('/usuario')
        .set('Authorization', token)
        .send(usuario)
      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT)
      expect(response.body).toEqual({})
    })
})
