const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

const criaUsuarioPadrao = {
  nome: 'bruno',
  email: 'bruno@gmail.com',
  senha: '123',
}

describe('Logar usuário', () => {

  it('deve logar o usuário', async () => {
    const { body } = await testServer.post('/usuario').send(criaUsuarioPadrao)
    const logarUsuario = await testServer
      .post('/login')
      .send({ email: body.email, senha: criaUsuarioPadrao.senha })

    expect(logarUsuario.statusCode).toEqual(StatusCodes.OK)
  })

  it('deve recusar o login do usuário', async () => {
    const usuario = {
      email: 'brunos@gmail.com',
      senha: '123445',
    }

    const logarUsuario = await testServer.post('/login').send(usuario)

    expect(logarUsuario.body).toHaveProperty('mensagem')
    expect(logarUsuario.body.mensagem).toMatch('Usuário e/ou senha inválido(s)')
    expect(logarUsuario.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  })
})
