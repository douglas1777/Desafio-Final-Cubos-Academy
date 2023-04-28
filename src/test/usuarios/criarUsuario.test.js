const { StatusCodes } = require('http-status-codes')
const { server } = require('../jest.setup')

describe('Criar usuário', () => {
  it('deve recusar a criação de um usuário', async () => {
    const usuario = {
      nome: 'bruno',
      email: 'bruno@gmail.com',
    }

    const response = await server.post('/usuario').send(usuario)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  }),
    it('deve criar um usuário', async () => {
      const usuario = {
        nome: 'bruno',
        email: 'bruno@gmail.com',
        senha: '123',
      }

      const response = await server.post('/usuario').send(usuario)

      expect(response.body).toHaveProperty('id')
      expect(response.statusCode).toEqual(StatusCodes.CREATED)
    })
})
