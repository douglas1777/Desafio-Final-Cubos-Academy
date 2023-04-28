const { StatusCodes } = require('http-status-codes')
const { server } = require('../jest.setup')

describe('Editar usuário', () => {
  let usuarioId

  beforeAll(async () => {
    const usuario = {
      nome: 'bruno',
      email: 'bruno2@gmail.com',
      senha: '123',
    }
    const postUsuario = await server.post('/usuario').send(usuario)
    usuarioId = postUsuario.id
  })

  it('deve recusar a edição de um usuário', async () => {
    const usuario = {
      nome: 'bruno',
      email: 'bruno2@gmail.com',
    }

    const response = await server.put('/usuario').send(usuario)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  }),
    it('deve editar um usuário', async () => {
      const usuario = {
        nome: 'bruno',
        email: 'bruno@gmail.com',
        senha: '123',
      }

      const response = await server.post('/usuario').send(usuario)

      expect(response.body).toHaveProperty('id')
    })
})
