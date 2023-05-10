const { StatusCodes } = require('http-status-codes')

const {
  verificaDadosRepetidos,
} = require('../../utils/verificaEmailCpfCliente')
const { repos } = require('../../repositorios')
const msg = require('../../utils/msgErros')

const cadastrarCliente = async (req, res) => {
  const { email, cpf } = req.body

  const clienteExiste = await repos.consultaCliente(email, cpf)

  if (clienteExiste) {
    const dados = verificaDadosRepetidos(req.body, clienteExiste)

    return res.status(StatusCodes.BAD_REQUEST).json({
      mensagem: `Já existe cliente cadastrado com o ${dados} informado`,
    })
  }

  const cliente = await repos.salvarCliente(req.body)

  return res.status(StatusCodes.CREATED).json(cliente)
}

const editarCliente = async (req, res) => {
  const { email, cpf } = req.body
  const { id } = req.params

  const clienteExiste = await repos.clienteDetalhado(id)

  if (!clienteExiste) {
    return res.status(StatusCodes.NOT_FOUND).json(msg.erro_usuario_nao_encontrado)
  }

  const emailOuCpfExiste = await repos.consultaCliente(email, cpf)

  if (emailOuCpfExiste && emailOuCpfExiste.id != id) {
    const dados = verificaDadosRepetidos(req.body, emailOuCpfExiste)

    return res.status(StatusCodes.BAD_REQUEST).json({
      mensagem: `Já existe cliente cadastrado com o ${dados} informado`,
    })
  }
  //atualizar cliente
  await repos.atualizarCliente(req.body, id)

  return res.status(StatusCodes.NO_CONTENT).send()
}

const listarClientes = async (req, res) => {
  const clientes = await repos.listarClientes()
  return res.status(StatusCodes.OK).json(clientes)
}

const detalharCliente = async (req, res) => {
  const { id } = req.params
  const cliente = await repos.clienteDetalhado(id)

  if (!cliente) {
    return res.status(StatusCodes.NOT_FOUND).json(msg.erro_cliente_nao_encontrado)
  }
  return res.status(StatusCodes.OK).json(cliente)
}

module.exports = {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  detalharCliente,
}
