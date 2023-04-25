const { verificaToken } = require('../utils/jwt')

const validarToken = (req, res, next) => {
  const { authorization } = req.headers

  try {
    if (!authorization) {
      throw new Error('Um token deve ser enviado')
    }
    const token = authorization.split(' ')[1]

    const { id } = verificaToken(token, process.env.SECRETJWT)

    req.usuarioId = id
    next()
  } catch (erro) {
    console.log(erro)
    return res.status(400).json({
      mensagem: erro.message,
    })
  }
}

module.exports = {
  validarToken,
}
