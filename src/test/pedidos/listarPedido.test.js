const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token

describe('Listar pedido', () => {
    beforeAll(async () => {
        const { body } = await testServer
            .post('/usuario')
            .send({ nome: 'bruno', email: 'bruno@email.com', senha: '123' })

        const logarUsuario = await testServer
            .post('/login')
            .send({ email: body.email, senha: '123' })

        token = 'bearer ' + logarUsuario.body.token
    })

    it('não deve listar os pedidos, cliente-id nao encontrado', async () => {
        const response = await testServer
            .get('/pedido?cliente_id=9999')
            .set('Authorization', token)
            .send()

        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(response.body).toHaveProperty('mensagem')
        expect(response.body.mensagem).toMatch('Cliente não encontrado')
    })

    it('deve listar somente os pedidos com cliente enviado', async () => {
        const response = await testServer
            .get(`/pedido?cliente_id=${1}`)
            .set('Authorization', token)
            .send()

        expect(response.statusCode).toEqual(StatusCodes.OK)
        expect(response.body).toBeTruthy()
    })

    it('deve listar todos os pedidos', async () => {
        const response = await testServer
            .get('/pedido')
            .set('Authorization', token)
            .send()

        expect(response.statusCode).toEqual(StatusCodes.OK)
        expect(response.body).toBeTruthy()
    })
})
