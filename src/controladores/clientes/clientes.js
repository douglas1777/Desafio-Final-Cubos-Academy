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

module.exports = { cadastrarCliente }
