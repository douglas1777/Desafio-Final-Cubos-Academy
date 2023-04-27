const { criptografar } = require('../../utils/bcrypt')
const { StatusCodes } = require('http-status-codes')
const { erro_cliente_existe } = require('../../utils/msgErros')

const {
  salvarCliente,
  consultaCliente,
  atualizarCliente,
} = require('../../repositorios/clientes')

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body
  //TODO realizar apenas uma vez a busca e verificar as duas informações

  const emailExiste = await consultaCliente(email, cpf)
  console.log(emailExiste)

  if (emailExiste) {
    return res.status(StatusCodes.UNAUTHORIZED).json(erro_cliente_existe)
  }

  const cliente = await salvarCliente({
    nome,
    email,
    cpf,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
  })
  console.log(cliente)

  return res.status(StatusCodes.CREATED).json(cliente[0])
}
const editarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body
  const { id } = req.params

  const emailOuCpfExiste = await consultaCliente(email, cpf)

  if (emailOuCpfExiste && emailOuCpfExiste.id !== Number(id)) {
    return res.status(StatusCodes.BAD_REQUEST).json(erro_cliente_existe)
  }

  await atualizarCliente({ ...req.body }, { id })

  return res.status(StatusCodes.CREATED).json('Cliente atualizado com sucesso')
}

module.exports = { cadastrarCliente, editarCliente }
