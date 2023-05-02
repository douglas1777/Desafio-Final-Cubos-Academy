const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token
const criaUsuarioPadrao = {
  nome: 'bruno',
  email: 'bruno@gmail.com',
  senha: '123',
}
describe('Logar usuário', () => {
  beforeAll(async () => {
    const { body } = await testServer.post('/usuario').send(criaUsuarioPadrao)

    const logarUsuario = await testServer
      .post('/login')
      .send({ email: body.email, senha: criaUsuarioPadrao.senha })
    token = 'bearer ' + logarUsuario.body.token

    expect(logarUsuario.statusCode).toEqual(StatusCodes.OK)
  })

  it('deve recusar o login do usuário', async () => {
    const usuario = {
      email: 'bruno@gmail.com',
      senha: '123445',
    }

    const logarUsuario = await testServer.post('/login').send(usuario)

    expect(logarUsuario.body).toHaveProperty('mensagem')
    expect(logarUsuario.body.mensagem).toMatch('Usuário e/ou senha inválido(s)')
    expect(logarUsuario.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  })
})

describe('Editar usuário', () => {
  it('deve recusar a edição de um usuário por outro email já existente', async () => {
    await testServer.post('/usuario').send({
      nome: 'bruno',
      email: 'brunoeditado@gmail.com',
      senha: '123',
    })

    const usuario = {
      nome: 'brunoteste',
      email: 'brunoeditado@gmail.com',
      senha: '12335',
    }

    const response = await testServer
      .put('/usuario')
      .set('Authorization', token)
      .send(usuario)

    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toMatch(
      'Já existe usuário cadastrado com o e-mail informado'
    )
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
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
        .send({ ...criaUsuarioPadrao, email: 'email' })

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
