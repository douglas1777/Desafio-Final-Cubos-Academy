const { StatusCodes } = require('http-status-codes')

const { criptografar } = require('../../utils/bcrypt')
const msg = require('../../utils/msgErros')
const { repos } = require('../../repositorios')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  const emailExiste = await repos.consultaUsuario(email)

  const criptografiaSenha = await criptografar(senha)

  if (emailExiste) {
    return res.status(StatusCodes.BAD_REQUEST).json(msg.erro_usuario_existe)
  }

  const usuario = await repos.salvarUsuario({
    nome,
    email,
    senha: criptografiaSenha,
  })

  return res
    .status(StatusCodes.CREATED)
    .json({ id: usuario.id, nome: usuario.nome, email: usuario.email })
}

const detalharUsuario = async (req, res) => {
  const id = req.usuarioId

  const usuarioEncontrado = await repos.consultaUsuario(id)

  if (!usuarioEncontrado) {
    return res.status(StatusCodes.NOT_FOUND).json(msg.erro_usuario_nao_encontrado)
  }
  // eslint-disable-next-line no-unused-vars
  const { senha: _, id: Id, ...usuario } = usuarioEncontrado

  return res.json(usuario)
}

const editarUsuario = async (req, res) => {
  const { email, senha } = req.body
  const id = req.usuarioId

  const usuarioExiste = await repos.consultaUsuario(id)

  if (!usuarioExiste) {
    return res.status(StatusCodes.NOT_FOUND).json(msg.erro_usuario_nao_encontrado)
  }

  const emailExiste = await repos.consultaUsuario(email)

  if (emailExiste && (emailExiste.email !== email || emailExiste.id !== id)) {
    return res.status(StatusCodes.BAD_REQUEST).json(msg.erro_usuario_existe)
  }
  const senhaEncriptada = await criptografar(senha)

  await repos.atualizarUsuario({ ...req.body, senha: senhaEncriptada }, id)

  return res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  editarUsuario,
}
