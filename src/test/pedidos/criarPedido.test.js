const { StatusCodes } = require('http-status-codes')
const { testServer } = require('../jest.setup')

let token

describe('Criar pedido', () => {
  beforeAll(async () => {
    const { body } = await testServer
      .post('/usuario')
      .send({ nome: 'bruno', email: 'bruno@email.com', senha: '123' })

    const logarUsuario = await testServer
      .post('/login')
      .send({ email: body.email, senha: '123' })

    token = 'bearer ' + logarUsuario.body.token
  })

  it('deve recusar a criação de um pedido quando o id do cliente não é fornecido', async () => {
    const pedido = {
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      pedido_produtos: [
        {
          produto_id: 3,
          quantidade_produto: 1,
        },
        {
          produto_id: 9,
          quantidade_produto: 2,
        },
      ],
    }

    const response = await testServer
      .post('/pedido')
      .set('Authorization', token)
      .send(pedido)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toHaveProperty('cliente_id')
  })

  it('deve recusar a criação de um pedido quando as informações do dos pedido_produtos não são fornecidas', async () => {
    const pedido = {
      cliente_id: 1,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
    }

    const response = await testServer
      .post('/pedido')
      .set('Authorization', token)
      .send(pedido)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toEqual({
      pedido_produtos: 'pedido_produtos é um campo obrigatório',
    })
  })

  it('deve recusar a criação de um pedido quando o id do produto não é fornecido', async () => {
    const pedido = {
      cliente_id: 1,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      pedido_produtos: [
        {
          quantidade_produto: 1,
        },
        {
          produto_id: 9,
          quantidade_produto: 2,
        },
      ],
    }

    const response = await testServer
      .post('/pedido')
      .set('Authorization', token)
      .send(pedido)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toEqual({
      'pedido_produtos[0].produto_id':
        'pedido_produtos[0].produto_id é um campo obrigatório',
    })
  })

  it('deve recusar a criação de um pedido quando a quantidade do produto não é fornecida', async () => {
    const pedido = {
      cliente_id: 1,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      pedido_produtos: [
        {
          produto_id: 3,
        },
        {
          produto_id: 9,
          quantidade_produto: 2,
        },
      ],
    }

    const response = await testServer
      .post('/pedido')
      .set('Authorization', token)
      .send(pedido)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toEqual({
      'pedido_produtos[0].quantidade_produto':
        'pedido_produtos[0].quantidade_produto é um campo obrigatório',
    })
  })

  it('deve recusar a criação de um pedido quando o cliente não é encontrado no banco de dados', async () => {
    const pedido = {
      cliente_id: 999,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      pedido_produtos: [
        {
          produto_id: 3,
          quantidade_produto: 1,
        },
        {
          produto_id: 9,
          quantidade_produto: 2,
        },
      ],
    }

    const response = await testServer
      .post('/pedido')
      .set('Authorization', token)
      .send(pedido)

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toEqual('Cliente não encontrado')
  })

  it('deve recusar a criação de um pedido quando o produto não é encontrado no banco de dados', async () => {
    const pedido = {
      cliente_id: 1,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      pedido_produtos: [
        {
          produto_id: 999,
          quantidade_produto: 1,
        },
        {
          produto_id: 3,
          quantidade_produto: 2,
        },
      ],
    }

    const response = await testServer
      .post('/pedido')
      .set('Authorization', token)
      .send(pedido)

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toEqual('Produto não encontrado')
  })

  it('deve recusar a criação de um pedido quando a quantidade de produto solicitada está acima do volume em estoque', async () => {
    const pedido = {
      cliente_id: 1,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      pedido_produtos: [
        {
          produto_id: 3,
          quantidade_produto: 100000,
        },
        {
          produto_id: 9,
          quantidade_produto: 2,
        },
      ],
    }

    const response = await testServer
      .post('/pedido')
      .set('Authorization', token)
      .send(pedido)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('mensagem')
    expect(response.body.mensagem).toEqual(
      'A quantidade de produto solicitada está acima do volume em estoque'
    )
  })

  it('deve criar um pedido com sucesso', async () => {
    const pedido = {
      cliente_id: 1,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      pedido_produtos: [
        {
          produto_id: 3,
          quantidade_produto: 1,
        },
        {
          produto_id: 9,
          quantidade_produto: 2,
        },
      ],
    }

    const response = await testServer
      .post('/pedido')
      .set('Authorization', token)
      .send(pedido)

    expect(response.statusCode).toEqual(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('cliente_id')
    expect(response.body).toHaveProperty('observacao')
    expect(response.body).toHaveProperty('valor_total')
  })
})
