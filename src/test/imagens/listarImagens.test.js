const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token

describe('Listar imagens', () => {
    beforeAll(async () => {
        const { body } = await testServer
            .post('/usuario')
            .send({ nome: 'bruno', email: 'bruno@email.com', senha: '123' })

        const logarUsuario = await testServer
            .post('/login')
            .send({ email: body.email, senha: '123' })

        token = 'bearer ' + logarUsuario.body.token
    })

    it('deve listar todas as imagens', async () => {
        const response = await testServer
            .get('/arquivo')
            .set('Authorization', token)
            .send()

        expect(response.statusCode).toEqual(StatusCodes.OK)
        expect(response.body).toBeTruthy()
    })
})