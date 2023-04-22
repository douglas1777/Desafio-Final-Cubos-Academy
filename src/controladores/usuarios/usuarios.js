const { criptografar } = require('../../utils/bcrypt')
const { StatusCodes } = require('http-status-codes')
const {
  consultaUsuario,
  salvarUsuario,
  atualizarUsuario,
} = require('../../repositorios/usuarios')
const {
  erro_usuario_nao_encontrado,
  erro_usuario_existe,
} = require('../../utils/msgErros')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  const criptografiaSenha = await criptografar(senha)

  const emailExiste = await consultaUsuario(email)

  if (emailExiste) {
    return res.status(StatusCodes.UNAUTHORIZED).json(erro_usuario_existe)
  }
  const [usuario] = await salvarUsuario({
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

  const usuarioEncontrado = await consultaUsuario(id)

  if (!usuarioEncontrado) {
    return res.status(StatusCodes.NOT_FOUND).json(erro_usuario_nao_encontrado)
  }
  // eslint-disable-next-line no-unused-vars
  const { senha: _, id: Id, ...usuario } = usuarioEncontrado

  return res.status(200).json(usuario)
}

const editarUsuario = async (req, res) => {
  const { email, senha } = req.body
  const id = req.usuarioId

  const emailExiste = await consultaUsuario(email)

  if (emailExiste && (emailExiste.email !== email || emailExiste.id !== id)) {
    return res.status(StatusCodes.BAD_REQUEST).json(erro_usuario_existe)
  }
  const senhaEncriptada = await criptografar(senha)

  await atualizarUsuario({ ...req.body, senha: senhaEncriptada }, id)

  return res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  editarUsuario,
}
