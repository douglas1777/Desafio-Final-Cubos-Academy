const { criptografar } = require('../../utils/bcrypt')
const { StatusCodes } = require('http-status-codes')
const { erro_cliente_existe } = require('../../utils/msgErros')

const {
  salvarCliente,
  consultaCliente,
} = require('../../repositorios/clientes')

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body
  //TODO realizar apenas uma vez a busca e verificar as duas informações

  const emailExiste = await consultaCliente(email)
  const cpfExiste = await consultaCliente(cpf)

  if (emailExiste || cpfExiste) {
    return res.status(StatusCodes.UNAUTHORIZED).json(erro_cliente_existe)
  }

  const [cliente] = salvarCliente({
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
  return res.status(StatusCodes.CREATED).json({
    id: cliente.id,
    email: cliente.email,
    cpf: cliente.cpf,
    cep: cliente.cep,
    rua: cliente.rua,
    numero: cliente.numero,
    bairro: cliente.bairro,
    cidade: cliente.cidade,
    estado: cliente.estado,
  })
}

module.exports = { cadastrarCliente }
